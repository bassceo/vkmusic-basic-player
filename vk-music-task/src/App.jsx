import {
  AppRoot,
  SplitLayout,
  PanelHeader,
  usePlatform,
  Panel,
  Group,
  Header,
  SimpleCell,
  Div
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Track from './components/Track';
import sample from './assets/01.mp3';
import deli from './assets/02.mp3';


const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader separator={false} />}>
        <Panel>
          <PanelHeader>Музыка</PanelHeader>
          <Group>
              <Track 
                trackId="sample" 
                trackName="Трек" 
                artist="Исполнитель" 
                track={sample} 
                coverUrl="/images/noplay.png" 
              />
              <Track 
                trackId="deli" 
                trackName="DELI [GRIME DUB]" 
                artist="Omar ؏" 
                track={deli} 
                coverUrl="/images/deliart.jpg" 
              />
          </Group>
        </Panel>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
