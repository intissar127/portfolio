import streamlit as st
import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
import weather

# Initialize Firebase Admin SDK (only once)
if not firebase_admin._apps:
    cred = credentials.Certificate('weather-app-31f6e-b7ba43dc932a.json')
    firebase_admin.initialize_app(cred)

def app():
    # Initialize session state for authentication
    if 'is_auth' not in st.session_state:
        st.session_state['is_auth'] = False
        st.session_state['username'] = None
        st.session_state['useremail'] = None

    st.title(f"Welcome to 🌦️:blue[Weather APP] {st.session_state['username'] if st.session_state['username'] else ""}! 🌟")
    def signout():
        st.session_state['is_auth'] = False
        st.session_state['username'] = None
        st.session_state['useremail'] = None
    # If the user is authenticated, display a welcome message
    if st.session_state['is_auth']:
        
        st.title("You can now access the Weather App to check conditions in any location!")
        st.button("Sign out",on_click=signout)
        return  # Stop rendering the login/signup UI

    # Login/Signup UI
    choice = st.selectbox('Login/Signup', ['Login', 'Signup'])
    

    def login():
        try:
            # Authenticate the user
            user = auth.get_user_by_email(email)
            st.session_state['is_auth'] = True  # Update session state to indicate authentication
            st.session_state['username'] = user.uid
            st.session_state['useremail'] = user.email
            st.success(f"Welcome back, {user.email}!")
        except Exception as e:
            st.warning('Login Failed. Check your email or password.')
            st.error(str(e))

    if choice == 'Login':
        # Render input fields only if not authenticated
        email = st.text_input('Email Address')
        password = st.text_input('Password', type='password')
        if st.button('Login'):
            login()  # Call the login function
    else:
        username = st.text_input('Enter your unique username')
        email = st.text_input('Email Address')
        password = st.text_input('Password', type='password')
        if st.button('Create Account'):
            try:
                # Create a new user
                user = auth.create_user(email=email, password=password, uid=username)
                st.audio("success_sound.mp3", format="audio/mp3", autoplay=True)

                # Inject custom CSS to hide the st.audio player
                st.markdown(
                    """
                    <style>
                    audio {
                        display: none;
                    }
                    </style>
                    """,
                    unsafe_allow_html=True
                )
                st.success('✅ Account created successfully!')
                st.info('Please log in using your email and password.')
            except Exception as e:
                st.error(f"Error creating account: {e}")
