import streamlit as st
import requests
from streamlit_folium import st_folium
from geopy.geocoders import Nominatim
import folium



# OpenWeatherMap API Key


# Function to get weather data
def get_weather(city, api_key):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        st.error("City not found. Please try again.")
        return None

# Function to fetch products
def fetch_products():
    response = requests.get("http://localhost:3000/products")
    if response.status_code == 200:
        return response.json()
    else:
        st.error("Failed to fetch products.")
        return []
def app():
    API_KEY = "06cbfe4b1bfe40dd9e32a1e93bbe9809"
    st.title("🌍 Weekly Weather Information")
    st.info("Please select on the map or enter city")

    #    Map and input section
    # col1, col2 = st.columns([2, 1])

# Create Map
    default_lat, default_lon = 33.8869, 9.5375
    map = folium.Map(location=[default_lat, default_lon], zoom_start=4)

# Display map
    # with col1:
    clicked_marker = st_folium(map, width=700, height=500)

    selected_city = None
    if clicked_marker and 'last_clicked' in clicked_marker and clicked_marker['last_clicked']:
        lat, lon = clicked_marker['last_clicked']['lat'], clicked_marker['last_clicked']['lng']
        geolocator = Nominatim(user_agent="weather_app")
        location = geolocator.reverse((lat, lon), language='en')
        if location:
            selected_city = location.raw.get("address").get("city", "Unknown")

    # with col2:
    city = st.text_input(
        "Enter a city name:",
        placeholder="e.g., London",
        value=selected_city if selected_city else ""
    )

    if city:
        selected_city = city

    # Display weather and recommendations
    if selected_city:
        weather_data = get_weather(selected_city, API_KEY)
        if weather_data:
            st.subheader(f"Weather in {weather_data['name']}, {weather_data['sys']['country']}")
            temp = weather_data['main']['temp']
            st.write(f"Temperature: {temp}°C")
            st.write(f"Weather: {weather_data['weather'][0]['description'].capitalize()}")
            
            st.image("b.png", caption="Bella Boutique", width=230)

        # Bella Boutique Section
            st.markdown("""
           
                
                <div>
                    <h3>For this weather, we suggest buying from <span style="color: #F25;">Bella Boutique</span>.</h3>
                    <p><span style="color:red;font-size:30px;">Unbeatable deals</span> with <span style="color:red;font-size:30px;">generous discounts</span> to save you money!</p>
                </div>
          
            """, unsafe_allow_html=True)

        # Recommendations Section
            st.markdown("<h3>Based on this weather, we suggest:</h3>", unsafe_allow_html=True)
            rec_col1, rec_col2, rec_col3 = st.columns(3)

            with rec_col1:
                st.markdown("""
                <div style="background-color: #f2e0e9; padding: 1.5rem; border-radius: 10px; text-align: center;">
                    <h4>Activities 🚵🏻‍♀️</h4>
                    <p>Enjoy hiking or a picnic in the park.</p>
                </div>
                """, unsafe_allow_html=True)

            with rec_col2:
                st.markdown("""
                <div style="background-color: #f2e0e9; padding: 1.5rem; border-radius: 10px; text-align: center;">
                    <h4>Clothing 🧥</h4>
                    <p>Wear a light jacket or long pants.</p>
                </div>
                """, unsafe_allow_html=True)

            with rec_col3:
                st.markdown("""
                <div style="background-color: #f2e0e9; padding: 1.5rem; border-radius: 10px; text-align: center;">
                    <h4>Travel Tips ✈️🧳</h4>
                    <p>Great weather for a road trip!</p>
                </div>
                """, unsafe_allow_html=True)

        # Fetch and display products
            products = fetch_products()
        
            if products:
                st.markdown("<h3>Recommended Products:</h3>", unsafe_allow_html=True)

            filtered_products = [
                product for product in products
                if (
                ("rain" in weather_data['weather'][0]['description'].lower() and product['category'] == "Rainy Day") or
                ("snow" in weather_data['weather'][0]['description'].lower() or "clouds" in weather_data['weather'][0]['description'].lower() and product['category'] == "Cold Day") or
                ("clear" in weather_data['weather'][0]['description'].lower() and product['category'] == "Sunny Day") or
                ("hot" in weather_data['weather'][0]['description'].lower() and product['category'] == "Hot Weather")
                )
            ]

            if filtered_products:
                # Display products in rows of 3
                for i in range(0, len(filtered_products), 3):
                    cols = st.columns(3)  # Create 3 columns for each row
                    for idx, product in enumerate(filtered_products[i:i + 3]):
                        with cols[idx]:  # Place product in the appropriate column
                            discounted_price = round(product["price"] * (1 - product["discount"] / 100), 2)
                            st.markdown(f"""
                            <div style="background-color: #e7fefe; padding: 1rem; border-radius: 10px; text-align: center;">
                            <img src="{product['image']}" style="width: 180px; border-radius: 10px;" alt="{product['title']}"/>
                            <h4>{product['title']}</h4>
                            <p><strong>Category:</strong> {product['category']}</p>
                            <p><strong>Original Price:</strong> ${product['price']}</p>
                            <p><strong>Discounted Price:</strong> ${discounted_price}</p>
                            </div>
                            """, unsafe_allow_html=True)
            else:
                st.write("No matching products found.")
        else:
            st.write("No products available.")


