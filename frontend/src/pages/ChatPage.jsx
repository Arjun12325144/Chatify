import {useAuthStore} from '../store/useAuthStore'
function ChatPage () {
  const {logout}  = useAuthStore();
  return (
    <div className='w-full h-full  flex items-center justify-center z-10'>
      chatPage
      <button onClick={logout} className='bg-red-600 p-7'>Logout</button>
    </div>
  )
}

export default ChatPage;