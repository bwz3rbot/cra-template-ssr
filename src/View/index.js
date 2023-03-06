import LayoutProvider from "../Layout";
import { useRouter } from "../Router";
export default function View() {
	const element = useRouter();
	return <LayoutProvider>{element}</LayoutProvider>;
}
