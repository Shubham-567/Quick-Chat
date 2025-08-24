const Welcome = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full p-4 text-foreground bg-background'>
      <h2 className='text-3xl font-bold mb-4'>Welcome to QuickChat!</h2>
      <p className='text-lg text-muted mb-8'>
        Select a user from the sidebar to start chatting.
      </p>
      <div className='flex justify-center'>
        <img
          src='/chat_app.svg'
          alt='QuickChat Logo'
          className='size-20 rounded-full'
        />
      </div>
    </div>
  );
};

export default Welcome;
