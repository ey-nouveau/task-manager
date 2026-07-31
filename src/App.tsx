import { ConfigProvider } from 'antd';
import { BoardPage } from './components/pages/BoardPage';

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          borderRadius: 0,
          colorBgContainer: '#ffffff',
          colorBorder: '#000000',
        },
      }}
    >
      <BoardPage />
    </ConfigProvider>
  );
};

export default App;