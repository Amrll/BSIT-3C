const Avatar = ({
  name,
  userProfile,
}: {
  name: string;
  userProfile: string;
}) => {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300">
      <img src={userProfile} alt={name} />
      {name?.charAt(0)}
    </div>
  );
};

export default Avatar;
