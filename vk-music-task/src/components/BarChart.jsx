import { useSpring, animated } from '@react-spring/web';
import './BarChart.css';

const getRandomDelay = () => Math.floor(Math.random() * 1000); 

const Bar = ({ delay }) => {
  const props = useSpring({
    loop: { reverse: true },
    from: { height: '20%' },
    to: { height: '90%' },
    delay,
    config: { duration: 1000 }
  });

  return (
    <animated.div
        className='bar'
        style={{
            ...props
        }}
    />
  );
};

const BarChart = () => {
  const bars = Array(5).fill(null);

  return (
    <div className="chart-container">
      {bars.map((_, index) => (
        <Bar key={index} delay={getRandomDelay()} />
      ))}
    </div>
  );
};

export default BarChart;
