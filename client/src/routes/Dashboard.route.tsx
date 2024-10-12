import { User } from "firebase/auth";
import { userState } from "../store/atoms";
import { RecoilState, useRecoilValue } from "recoil";
import TreeViewer from "../components/TreeViewer/TreeViewer";


const Dashboard = () => {
    const user = useRecoilValue<User | null>(userState as unknown as RecoilState<User | null>);
    return (
        <div>
            <div className="flex">
                <TreeViewer />
            </div>
        </div>
    )
}

export default Dashboard;