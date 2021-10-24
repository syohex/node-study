import colorData from './color-data.json'
import { ColorList } from "./ColorList";

export function App() {
    const [colors] = useState(colorData);
    return <ColorList colors={colors} />;
}