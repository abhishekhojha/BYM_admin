import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)
const Dashboard = () => {
  console.log("Dashboard component rendered");
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {/* Add more content here */}
    </div>
  );
};

export default Dashboard