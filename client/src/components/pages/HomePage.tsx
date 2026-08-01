export const HomePage = () => {
  const bgUrl = import.meta.env.BASE_URL + 'vibey-bg.png';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url("${bgUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} />
  );
};