import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useDebounce } from 'use-debounce';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';


function Home() {
  const [tasks,setTasks] = useState([]);
  const [categories,setCategories] = useState([]);
  const [CatId,setCatId] = useState(null);
  const [Direction,setDirection] = useState(null);
  const [page , setPage] = useState(1);
  const [term,setTerm]=useState('');
  const [spiner ,setSpiner]=useState(false)
  const serachDebounceTerm = useDebounce(term,300);
  const [allcategory,setallcategory]=useState([]);


  const [title,setTitle] =useState('');
  const [body,setBody] =useState('');
  const [state,setState] =useState('');
  const [catId,setCateId] =useState('');
  const [Loadin,setLoading] = useState(false);
  const [errors,setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!categories.length)
    {
      fetchCategories();
    }
      if(!tasks.length)
      {
        fetchTasks();
      }  
     
   fetchOrder();
    setTitle('');
    setBody('');
        
  },[page,CatId,Direction,serachDebounceTerm[0],Loadin])

  const creatTask = async (e)=>{
    setLoading(true);
    e.preventDefault();
    const task ={
      title,
      body,
      category_id:catId
    };
    try {
       await axios.post('api/tasks/create',task);
       fetchTasks();
       Swal.fire({
        position: "center",
        icon: "success",
        title: "Your task has been added",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false)
      navigate('/');
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErrors(error.response.data.errors);

    }
   }
   const renderError =(field)=>( 
    errors?.[field]?.map((er,index)=>(
     <p key={index} className='text-danger'>{er}</p>
    ))
   )
  //fetch categories 
  const fetchCategories = async () =>{
    try {
      const response = await axios.get('api/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  //fetch order by
  const fetchOrder = async ()=>{
    try {
      const response2 = await axios.get(`api/order/id/${Direction}/task?page=${page}`);
      setTasks(response2.data);
    } catch (error) {
      console.log(error)
    }
  }
  //fetch data from api url & database
  const fetchTasks = async () =>{
    try {
      
      if(CatId)
      {
        const response = await axios.get(`api/category/${CatId}/task?page=${page}`);
        setTasks(response.data);
        setSpiner(true)
      }
     else if(serachDebounceTerm[0] !== '')
     {
      const response = await axios.get(`api/search/${serachDebounceTerm[0]}/task?page=${page}`);
      setTasks(response.data);
      setSpiner(true)
     }
      else{
        const response = await axios.get(`api/tasks/?page=${page}`);
        setTasks(response.data);
        setSpiner(true)
      }
    
    } catch (error) {
      console.log(error);
    }
  }
    //fetch by next and previoce
    const fetchNextPrev=(link)=>{
      const url = new URL(link);
      setPage(url.searchParams.get('page'));
    }
    //delete
    const deletTask =(idtask)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then( async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`/api/tasks/${idtask}`);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            fetchTasks();
          } catch (error) {
            console.log(error);
          }
          
        }
      });
    }
 
  const renderPaginate =()=>(
    <ul className='pagination'>
           {
            tasks.links?.map((link,index)=>(
              <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
                <a style={{cursor:'pointer'}} onClick={()=>(fetchNextPrev(link.url))} className="page-link">
                  {link.label.replace('&laquo;','').replace('&raquo;','')}
                </a>
              </li>
            ))
           }
    </ul>
  )
  const CheckState =(state)=>(
      state ? (<span className='badge bg-success'>Done</span>)
      :(
<span className='badge bg-danger'>Processing...</span>
      )
  )

  return (
   <div className="container">


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">add new task</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <form onSubmit={(e)=>creatTask(e)} >
      <div className="modal-body">
     
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">title</label>
                            <input type="text" value={title} className={ `form-control ${errors.title  ? 'is-invalid' : ''}`} id="title" aria-describedby="emailHelp"
                            onChange={(e)=>{setTitle(e.target.value)}}
                            />
                           {renderError('title')}

                          </div>
                          <div className="mb-3">
                            <label htmlFor="body" className="form-label">body</label>
                            <textarea name="body" value={body} id="body" className={ `form-control ${errors.body  ? 'is-invalid' : ''}`}cols="15" rows="6"
                            onChange={(e)=>{setBody(e.target.value)}}
                            ></textarea>
                            {renderError('body')}

                          </div>
                          <div className="mb-3">
                            <label htmlFor="category" className="form-label">category</label>
                            <select className={ `form-select ${errors.category_id  ? 'is-invalid' : ''}`} value={catId}
                            onChange={(e)=>{setCateId(e.target.value)}}
                               >
                                <option disabled value="">choose the category</option>
                                {
                                  categories?.map(allcat=>(<option key={allcat.id} value={allcat.id}>{allcat.name}</option>))
                                }
                                
                             

                              </select>   
                              {renderError('category_id')}                     
                           </div>
                         
                  
                   </div>
      </form> 
    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       <form onSubmit={(e)=>creatTask(e)}>
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
     <div className='row my-5'>
      <div className="col-md-6 mb-4 ">
      <div className='mt-2'>
      <form className="d-flex" role="search">
        <input onChange={(event)=>{
          setCatId(null);
          setDirection(null);
          setPage(1);
          setTerm(event.target.value);
          fetchTasks();}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </form>
      </div>
      </div>
      <div className="col-md-6 mb-4">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
add task
</button>
      </div>
      <div className="col-md-9 card">
     
           <div className="card-body">
          <div className='table-responsive'>
          <table className="table">
            
              <thead>
                <tr>
                  <th>Id</th>
                  <th>title</th>
                  <th>body</th>
                  <th>Category</th>
                  <th>state</th>
                  <th>Creatde</th>
                  <th>action</th>
               
                </tr>
              </thead>
              {spiner ? 
               <tbody>
               { 
              
                tasks.data?.map(task=>( 
                 
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td >{task.title}</td>
                  <td >{task.body}</td>
                  <td>{task.category.name}</td>
                  <td>{CheckState(task.state)}</td>
                  <td>{task.created_at}</td>
                  <td className='d-flex'>
                    <Link to={`edit/${task.id}`} className='btn btn-sm-warning'>
                    <i className='fas fa-edit'></i>
                    </Link>
                    <button className='btn btn-sm-danger'
                   onClick={()=>{
                   
                    deletTask(task.id);
                    
                         
                  }}>
                    <i className='fas fa-trash'></i>
                    </button></td>
                </tr>
              )) 

              }
              </tbody> : 
              <tbody>
                <tr>
                  <td colSpan={7}>
                  <div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
                  </td>
                </tr>
                </tbody>
             }
             
            </table>
            <div className="my-4 d-flex justify-content-between">
                <div>Showing {tasks.from ||0} to {tasks.to || 0} from {tasks.total} results. </div>
                <div>{renderPaginate()}</div>
            </div>
          </div>
           </div>
      </div>
      <div className="col-md-3 card  ">
        <div className="card-header text-center bg-white"> <h5>Filter By Category</h5></div>
         <div className="card-body">
          <div className='form-check'>
            <input type="radio" name="category" className='form-check-input' id=""
            onChange={()=>{
              setPage(1);
              setCatId(null);
              setDirection(null);
              fetchTasks();
              
            }}
            checked={!CatId ?true : false}
             />
            <label htmlFor='category' className='form-check-label'>All</label>
             </div>
             {
            categories?.map(category =>(
              <div key={category.id} className='form-check'>
              <input type="radio" name="category" className='form-check-input'
              onChange={()=>{
                setPage(1);
                setCatId(event.target.value);
                setDirection(null);
                
              }}
              
              value={category.id}
              id={category.id}
               />
              <label htmlFor={category.id} className='form-check-label'>{category.name}</label>
               </div>
            ))
          }

             
      
         
            
         
         </div>
         <div className="card-header text-center bg-white"> <h5>Order By Id</h5></div>

         <div className="card-body mt-2">
             <div className='form-check'>
            <input type="radio" name="order" className='form-check-input' id=""
            onChange={()=>{
              setPage(1);
              setDirection('desc');
              setCatId(null);
              fetchOrder();

            }}
            checked={Direction && Direction === 'desc'?true:false}
             />
            <label htmlFor='order' className='form-check-label'><span>↓</span>Desc</label>
             </div>
            
               <div  className='form-check'>
              <input type="radio" name="order" className='form-check-input' id=""
              onChange={()=>{
                setPage(1);
                setDirection('asc');
                setCatId(null);
                fetchOrder();      
              }}
              
              checked={Direction && Direction === 'asc'?true:false}

               />
              <label htmlFor="order" className='form-check-label'><span>↑</span> ASC</label>
               </div>
          
          

             
      
         
            
         
         </div>
      </div>
    </div>
   </div>
  )
}

export default Home
