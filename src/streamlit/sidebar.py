import streamlit as st
from streamlit_option_menu import option_menu
import dashboard,login,posts,weather

st.set_page_config(page_title="Weather APP",  # Title of the tab
    page_icon="🌦️",)
 

class MultiApp:
    def __init__(self):
        self.apps=[]
    def add_app(self,title,function):
        self.apps.append({
            "title":title,
            "function":function
        })
    def run():
        with st.sidebar:
            app = option_menu(
            menu_title='Weather APP',
            options=['Home', 'Dashboard', 'Posts', 'Weather Forecast'],
            icons=[
                'house-fill',        # Home icon
                'speedometer',       # Dashboard icon
                      
                'chat-dots-fill',    # Posts icon
                'cloud-sun-fill'     # Weather Forecast icon
            ],menu_icon="cloud-sun",styles={
        "container": {
            "padding": "2rem",
            "background-color":"#E4E2F2",
        },
        "nav-link": {
            
            "font-size": "25px",
            "text-align": "left",
        },

    }
            )
        if app=='Home':
            login.app()
        if app=='Dashboard':
            dashboard.app()
        if app=='Posts':
            posts.app()
        if app=='Weather Forecast':
            weather.app()
                
    run()