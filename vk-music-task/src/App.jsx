import {
  AppRoot,
  SplitLayout,
  PanelHeader,
  usePlatform,
  Panel,
  Group
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Track from './components/Track';
import wayle from './assets/wayle.mp3';

const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
    
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <Panel>
          <Group>
            <Track trackName="Трек" artist="Исполнитель" track={wayle} coverUrl="/images/noplay.png" />
            <Track trackName="Мадрид" artist="Лиза" track={wayle} />
            <Track trackName="Самара" artist="Ярик" track={wayle} />
          </Group>
        </Panel>
      </SplitLayout>
    </AppRoot>
  );
};
export default App;