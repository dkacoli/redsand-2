import requests
import sys
import json
from datetime import datetime

class REDSANDAPITester:
    def __init__(self, base_url="https://dubai-elite-props.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_property_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if method == 'GET' and 'properties' in endpoint:
                        print(f"   Properties returned: {len(response_data) if isinstance(response_data, list) else 1}")
                    elif 'stats' in endpoint:
                        print(f"   Stats: {response_data}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Response text: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_get_properties(self):
        """Test getting all properties"""
        return self.run_test("Get All Properties", "GET", "properties", 200)

    def test_get_featured_properties(self):
        """Test getting featured properties"""
        return self.run_test("Get Featured Properties", "GET", "properties/featured", 200, params={"limit": 6})

    def test_create_property(self):
        """Test creating a new property"""
        property_data = {
            "title": "Test Luxury Villa",
            "description": "A beautiful test property in Dubai Marina with stunning views",
            "price": 2500000,
            "location": "Dubai",
            "area": "Dubai Marina",
            "bedrooms": 3,
            "bathrooms": 4,
            "sqft": 2500.0,
            "property_type": "investment",
            "status": "available",
            "features": ["Sea View", "Balcony", "Parking", "Gym"],
            "images": ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"],
            "roi": 8.5,
            "rental_yield": 6.2
        }
        
        success, response = self.run_test("Create Property", "POST", "properties", 200, data=property_data)
        if success and 'id' in response:
            self.created_property_id = response['id']
            print(f"   Created property ID: {self.created_property_id}")
        return success, response

    def test_get_single_property(self):
        """Test getting a single property by ID"""
        if not self.created_property_id:
            print("❌ Skipping - No property ID available")
            return False, {}
        
        return self.run_test("Get Single Property", "GET", f"properties/{self.created_property_id}", 200)

    def test_update_property(self):
        """Test updating a property"""
        if not self.created_property_id:
            print("❌ Skipping - No property ID available")
            return False, {}
        
        update_data = {
            "title": "Updated Test Luxury Villa",
            "price": 2750000,
            "status": "pending"
        }
        
        return self.run_test("Update Property", "PUT", f"properties/{self.created_property_id}", 200, data=update_data)

    def test_property_filters(self):
        """Test property filtering"""
        filters = [
            {"property_type": "investment"},
            {"property_type": "residential"},
            {"min_price": 1000000},
            {"max_price": 5000000},
            {"bedrooms": 3},
            {"status": "available"}
        ]
        
        all_passed = True
        for filter_params in filters:
            filter_name = ", ".join([f"{k}={v}" for k, v in filter_params.items()])
            success, _ = self.run_test(f"Filter Properties ({filter_name})", "GET", "properties", 200, params=filter_params)
            if not success:
                all_passed = False
        
        return all_passed, {}

    def test_get_areas(self):
        """Test getting unique areas"""
        return self.run_test("Get Areas", "GET", "areas", 200)

    def test_create_inquiry(self):
        """Test creating a contact inquiry"""
        inquiry_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "I'm interested in your luxury properties. Please contact me.",
            "property_id": self.created_property_id
        }
        
        return self.run_test("Create Inquiry", "POST", "inquiries", 200, data=inquiry_data)

    def test_get_inquiries(self):
        """Test getting all inquiries"""
        return self.run_test("Get Inquiries", "GET", "inquiries", 200)

    def test_get_stats(self):
        """Test getting dashboard stats"""
        success, response = self.run_test("Get Stats", "GET", "stats", 200)
        if success:
            required_fields = ["total_properties", "available_properties", "investment_count", "residential_count", "total_inquiries"]
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing required field: {field}")
                    return False, response
            print(f"   All required stats fields present")
        return success, response

    def test_delete_property(self):
        """Test deleting a property (cleanup)"""
        if not self.created_property_id:
            print("❌ Skipping - No property ID available")
            return False, {}
        
        return self.run_test("Delete Property", "DELETE", f"properties/{self.created_property_id}", 200)

    def test_404_endpoints(self):
        """Test 404 responses for non-existent resources"""
        tests = [
            ("Non-existent Property", "GET", "properties/non-existent-id", 404),
            ("Delete Non-existent Property", "DELETE", "properties/non-existent-id", 404),
        ]
        
        all_passed = True
        for name, method, endpoint, expected_status in tests:
            success, _ = self.run_test(name, method, endpoint, expected_status)
            if not success:
                all_passed = False
        
        return all_passed, {}

def main():
    print("🏢 REDSAND Real Estate API Testing")
    print("=" * 50)
    
    tester = REDSANDAPITester()
    
    # Test sequence
    test_functions = [
        tester.test_root_endpoint,
        tester.test_get_properties,
        tester.test_get_featured_properties,
        tester.test_create_property,
        tester.test_get_single_property,
        tester.test_update_property,
        tester.test_property_filters,
        tester.test_get_areas,
        tester.test_create_inquiry,
        tester.test_get_inquiries,
        tester.test_get_stats,
        tester.test_404_endpoints,
        tester.test_delete_property,  # Cleanup
    ]
    
    print(f"\n🚀 Running {len(test_functions)} test categories...")
    
    for test_func in test_functions:
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test function {test_func.__name__} failed with error: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())