import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './product.css'
import Chart from '../../components/Chart/Chart'
import { Publish } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useMemo } from 'react'
import { userRequest } from '../../requetMethod'
import { useEffect } from 'react'
import { updateProducts } from '../../redux/apiCalls'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'


const Product = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    const [productStats, setProductStats] = useState([])
    const [productName, setProductName] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [file, setFile] = useState(null)

    const product = useSelector((state) => state.product.products.find(product => product._id === productId))


    const MONTHS = useMemo(() => [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ],
      []
      );

      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("/orders/income?pid=" + productId);
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item) =>
              setProductStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [productId, MONTHS]);

      const handleProductName = (e) => {
        setProductName(e.target.value)
      }
      const handleProductDesc = (e) => {
        setProductDesc(e.target.value)
      }
      const handleProductPrice = (e) => {
        setProductPrice(e.target.value)
      }

      const handleFile = (e) => {
        setFile(e.target.files[0])
      }

    const handleUpdate = (e) => {
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
            const product = {productName, productDesc, productPrice, img: downloadURL};
            updateProducts(product, dispatch)
            });
        }
        );
    }


  return (
    <div className='product'>
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
            <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
            <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
        </div>
        <div className="productTopRight">
            <div className="productInfoTop">
                <img src={product.img}
                 alt="" 
                 className="productInfoImg" 
                />
                <span className="productName">{product.title}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue"> {product._id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Sales:</span>
                    <span className="productInfoValue">{productStats.Sales}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">In Stock:</span>
                    <span className="productInfoValue">{product.inStock}</span>
                </div>
            </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
            <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder={product.title} onChange={handleProductName} />
                <label>Product Description</label>
                <input type="text" placeholder={product.desc} onChange={handleProductDesc} />
                <label>Product Price</label>
                <input type="text" placeholder={product.price} onChange={handleProductPrice} />
                <label>In Stock</label>
                <select name="inStock" id="inStock">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    <img src={product.img} 
                     alt="" 
                     className="productImgUpload" 
                    />
                    <label for="file">
                        <Publish/>
                    </label>
                    <input type="file" id='file' style={{display: "none"}} onChange={handleFile}/>
                </div>
                <button className="productButton" onClick={handleUpdate}>Update</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Product
