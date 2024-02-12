import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

function Edit() {
  const [title,setTitle] =useState('');
  const [body,setBody] =useState('');
  const [state,setState] =useState('');
  const [catId,setCateId] =useState('');
  const [Loadin,setLoading] = useState(false);
  const {taskId} = useParams();
  const navigate = useNavigate();
  const [errors,setError]=useState([]);
const [categories,setCategories] = useState([]);
  //errors
  const renderError =(field)=>( 
   errors?.[field]?.map((er,index)=>(
    <p key={index} className='text-danger'>{er}</p>
   
   ))
   
  )


   //create tasks
   const updateTask = async (e)=>{
    setLoading(true)
    e.preventDefault();
    const task ={
      title,
      body,
      category_id:catId,
      state
    };
    try {
       await axios.put(`/api/tasks/${taskId}`,task);
       Swal.fire({
        position: "center",
        icon: "success",
        title: "Your task has been updated",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);

      navigate('/');
    } catch (error) {
      
      setLoading(false);
     /*  console.log(error) */
      setError(error.response.data.errors);
     
      console.log(error.response.data.errors.title)
    }
   }
const getTasks = async()=>{
  try {
    const response = await axios.get(`/api/tasks/${taskId}`)
 setTitle(response.data.title);
 setCateId(response.data.category_id);
 setBody(response.data.body);
 setState(response.data.state);
  } catch (error) {
    console.log(error)
  }
}
const fetchCategories = async () =>{
  try {
    const response = await axios.get(`/api/category`);
    setCategories(response.data);
  } catch (error) {
    console.log(error)
  }
  
}
   useEffect(()=>{
    
     getTasks();
     fetchCategories();
  
   },[])

  return (
    <div className='container'>
       <div className="row my-5">
           <div className="col-md-6-mx-auto">
            <div className="card">
              <div className="card-header bg-white">
                <h5 className='text-center mt-2'>Add new task</h5>

              </div>
              <div className="card-body">
              <form onSubmit={(e)=>updateTask(e)} >
                                   
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">title</label>
                           <input type="text" value={title} className={ `form-control ${errors.title  ? 'is-invalid' : ''}`} id="title" aria-describedby="emailHelp"
                            onChange={(e)=>{setTitle(e.target.value)}}
                            />
                          
                            {renderError('title')}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="body" className="form-label">body</label>
                            <textarea name="body" value={body} id="body" className={ `form-control ${errors.body  ? 'is-invalid' : ''}`} cols="15" rows="6"
                            onChange={(e)=>{setBody(e.target.value)}}
                            ></textarea>
                              {renderError('body')}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="category" className="form-label">category</label>
                            <select className={ `form-select ${errors.category_id? 'is-invalid' : ''}`} 
                            onChange={(e)=>{setCateId(e.target.value)}}
                            value={catId}
                               >
                                <option disabled value="">choose the category</option>
                               {
                                categories?.map((category)=>(<option key={category.id} value={category.id}>{category.name}</option>))
                               }
                              
                              </select>  
                              {renderError('category_id')}                     
                           </div>
                           <div className="mb-3">
                           <div class="form-check form-check-inline">
  <input class="form-check-input" name='state' type="checkbox" onChange={()=>{setState(!state)}} checked={state} id="inlineCheckbox1" value={state} />
  <label class="form-check-label" for="inlineCheckbox1">done</label>
</div>

                           </div>
                           {
          Loadin ?<button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span  role="status">Loading...</span>
        </button> :        <button type="submit" className="btn btn-primary">Save</button>

        }
                        </form>
              </div>
            </div>
           </div>
       </div>
    </div>
  )
}

export default Edit
