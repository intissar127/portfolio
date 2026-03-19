import streamlit as st
import requests
import plotly.express as px

# Function to fetch weather forecast
def get_weekly_forecast(city, api_key):
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        st.error("Could not fetch forecast data. Please check the city name and try again.")
        return None

def app():
    API_KEY = "06cbfe4b1bfe40dd9e32a1e93bbe9809"
    st.title("🌍 Weekly Weather Dashboard")
    city = st.text_input("Enter a city name:", placeholder="e.g., London")
    
    if city:
        forecast_data = get_weekly_forecast(city, API_KEY)
        
        if forecast_data:
            # Extract temperature and date-time
            temps = [item['main']['temp'] for item in forecast_data['list']]
            dates = [item['dt_txt'] for item in forecast_data['list']]

            # Create a dataframe for plotting
            df = {"Date": dates, "Temperature": temps}
            fig = px.line(df, x="Date", y="Temperature", title="Temperature Trend", markers=True)
            fig.update_layout(xaxis_title="Date", yaxis_title="Temperature (°C)")
            
            st.plotly_chart(fig)

            # Rainfall visualization
            rainfall = [item['rain']['3h'] if 'rain' in item else 0 for item in forecast_data['list']]
            fig = px.bar(x=dates, y=rainfall, title="Rainfall Over Time", labels={'x': 'Date', 'y': 'Rainfall (mm)'})
            st.plotly_chart(fig)

            # Weather conditions breakdown
            conditions = [item['weather'][0]['main'] for item in forecast_data['list']]
            condition_counts = {condition: conditions.count(condition) for condition in set(conditions)}
            fig = px.pie(values=list(condition_counts.values()), names=list(condition_counts.keys()), title="Weather Conditions Breakdown")
            st.plotly_chart(fig)
        else:
            st.warning("No data available to display. Please try again.")
    else:
        st.info("Enter a city name to see the weather forecast.")


