import React from 'react'
import { useState } from 'react'
import './newProduct.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import { addProducts } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'


const NewProduct = () => {

  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cats, setCats] = useState([])
  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const productId = location.pathname.split("/")[2]
  const  {isFetching} = useSelector((state) => state.product);
  const product = useSelector((state) => state.product.products.find(product => product._id === productId))

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleCat = (e) => {
    setCats(e.target.value.toLowerCase().split(","))
  }

  const handleColor = (e) => {
    setColor(e.target.value.toLowerCase().split(","))
  }

  const handleSize = (e) => {
    setSize(e.target.value.toLowerCase().split(","))
  }
 

  const handleCreate = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product = {...inputs, img: downloadURL, categories: cats, color: color, size: size};
      addProducts(product, dispatch)
      setSuccess(true)
    });
  }
);

  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <div className='newProductItem'>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleFile}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Description...."onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="200" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Jeans, Skirts" onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Product Colors</label>
          <input type="text" placeholder="Green, Orange" onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Product Sizes</label>
          <input type="text" placeholder="S, M, L" onChange={handleSize}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleCreate} disabled={isFetching}>Create</button>
      </form>
      {success && 
        <div className="successRight">
          <div className='successItem'>
            <img src={product.img}
              alt="" 
              className="successImg" 
            />
            <div className="successProductTitle">{product.title}</div>
            <div className="successProductDesc">{product.desc}</div>
            <h4 className='successText'>Sucessfully Uploaded A Product</h4>
          </div>
        </div>
      }
      </div>
    </div>
  )
}

export default NewProduct
