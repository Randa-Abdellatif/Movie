import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MediaItem from './Components/MediaItem/MediaItem';
import ItemDetails from './Components/ItemDetails/ItemDetails';







function App() {

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
      // console.log(userData);
    }
  } , [])

  const [userData, setuserData] = useState(null);

  

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);

    // console.log(encodedToken);
    // console.log(decodedToken);

    setuserData(decodedToken);
    
    // console.log(userData);
  }

  let routers = createBrowserRouter([
    { path: "", element: <Layout setuserData={setuserData}  userData={userData}/> , children: [
      { path:"home", element:<ProtectedRoute> <Home/></ProtectedRoute>},
      {path:"movies" , element: <ProtectedRoute><Movies/></ProtectedRoute> },
      {path:"tvshow" , element:<ProtectedRoute> <Tvshow/></ProtectedRoute>},
      {path:"people" , element:<ProtectedRoute><People/></ProtectedRoute> },
      {path:"ItemDetails/:id/:media_type" , element:<ProtectedRoute><ItemDetails/></ProtectedRoute> },
      {path:"login" , element: <Login saveUserData={saveUserData}/>},
      {index:true , element: <Register/>},
      {path:"*" , element: <Notfound/>},
    ]}
  ])

  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
