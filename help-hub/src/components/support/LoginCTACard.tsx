const LoginCTACard = () => {
  return (
    <div className="bg-muted/50 border border-border rounded-xl p-6 shadow-sm max-w-[600px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-[15px] text-foreground">
            Log in to manage your account and get personalised support
          </p>
        </div>
        <div className="ml-4">
          <button className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCTACard;
