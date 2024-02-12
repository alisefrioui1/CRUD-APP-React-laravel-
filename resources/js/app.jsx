import './bootstrap';
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Tasks from './components/Tasks/Task';
import Creat from './components/Tasks/Creat';
import Edit from './components/Tasks/Edit';
import Header from './components/Header';


ReactDOM.createRoot(document.getElementById("app")).render(
<div className='row'>
<div className="col-md-12">
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' exact element={<Tasks/>}/>
        <Route path='/create' exact element={<Creat/>}/>
        <Route path='/edit/:taskId' exact element={<Edit/>}/>
       
    </Routes>
    </BrowserRouter>
</div>
</div>
);