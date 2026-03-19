import streamlit as st 

from firebase_admin import firestore
def app():
  
  if 'db' not in st.session_state:
    st.session_state.db=''
  db=firestore.client()
  st.session_state.db=db
  msg=''
  if st.session_state['username']==None:
    msg=st.warning('Login to be able to POST!')
  else:
    msg=st.info(":blue[Post NOW!]")
    post=st.text_area(label=":red[New Post]",placeholder="Express what you feel about the weather or anything")
    if st.button('Post',use_container_width=20):
      if post!='':
        info=db.collection('Posts').document(st.session_state['username'])
        info = info.get()
            
        if info.exists:
          info=info.to_dict()
          if 'Content' in info.keys():
            pos=db.collection('Posts').document(st.session_state['username'])
            pos.update({u'Content':firestore.ArrayUnion([u'{}'.format(post)])})
          
          else:
            data={"Content":[post],'Username':st.session_state['username']}
            db.collection('Posts').document(st.session_state['username']).set(data)
        else:
          data={"Content":[post],'Username':st.session_state['username']}
          db.collection('Posts').document(st.session_state['username']).set(data)
        st.success('Post Uploaded')
  st.header(':red[latest Posts]')
  try:
    user_doc_ref = db.collection('Posts').document(st.session_state['username'])
    user_doc = user_doc_ref.get()

    if user_doc.exists:
      st.title(f"Posted by: {st.session_state['username']}")
      
      Content = user_doc.to_dict().get('Content',[])
      

      def delete_post(index):
        try:
          post_to_delete = Content[index]
          user_doc_ref.update({"Content": firestore.ArrayRemove([post_to_delete])})
          st.success("Post deleted successfully!")
                
        except Exception as e:
          st.error(f"Error deleting post: {e}")

      for idx in range(len(Content) - 1, -1, -1):  # Display posts in reverse order
            
        st.text_area(label='', value=Content[idx], disabled=True, key=f'post_{idx}')
        st.button('Delete Post', on_click=delete_post, args=(idx,), key=f'delete_{idx}')
    else:
        st.text("No posts found. Start by creating a post!")

  except Exception as e:
    if 'username' not in st.session_state or st.session_state['username'] is None:
        st.warning("Please log in first to see your posts.")
    else:
        st.error(f"An error occurred: {e}")

        
        