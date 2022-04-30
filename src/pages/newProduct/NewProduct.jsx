import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading/Loading";

export default function NewProduct() {
    const [inputs, setInputs] = useState(null)
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState([])
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleCat = (e) => {
        setCat(e.target.value.split(","))
    }
    const handleSize = (e) => {
        setSize(e.target.value.split(","))
    }
    const handleColor = (e) => {
        setColor(e.target.value.split(","))
    }

    const handleClick = (e) => {
        e.preventDefault()
        setLoading(true)
        //Para que las imagen con el mismo nombre no se pisen
        const fileName = new Date().getTime() + file.name
        //Traer del storage los datos
        const storage = getStorage(app)
        //Referencia
        const sotorageRef = ref(storage, fileName)
        //COnfiguracion de Firebase para los File y conseguir la URL
        const uploadTask = uploadBytesResumable(sotorageRef, file);

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
                    const product = { ...inputs, img: downloadURL, categories: cat, size: size, color: color };
                    console.log(product);
                    addProduct(product, dispatch).then(response => {
                        history.push('/products')
                        setLoading(false)
                    })
                });
            }
        );

    }

    return (
        <>
            {
                loading ? (
                    <>
                        <div className="contentLoading" >
                            <Loading />
                        </div>
                    </>
                ) : (
                    <div className="newProduct">
                        <h1 className="addProductTitle">New Product</h1>
                        <form className="addProductForm">
                            <div className="addProductItem">
                                <label>Image</label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={e => setFile(e.target.files[0])} />
                            </div>
                            <div className="addProductItem">
                                <label>Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Apple Airpods"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="addProductItem">
                                <label>Description</label>
                                <input
                                    name="desc"
                                    type="text"
                                    placeholder="description..."
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="addProductItem">
                                <label>Quantity</label>
                                <input
                                    name="quantity"
                                    type="number"
                                    placeholder="30"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="addProductItem">
                                <label>Price</label>
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="100"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="addProductItem">
                                <label>Categorie</label>
                                <input
                                    type="text"
                                    placeholder="jeans, hombre"
                                    onChange={handleCat}
                                />
                            </div>
                            <div className="addProductItem">
                                <label>Size</label>
                                <input
                                    type="text"
                                    placeholder="35, 36,37,38"
                                    onChange={handleSize}
                                />
                            </div>
                            <div className="addProductItem">
                                <label>Color</label>
                                <input
                                    type="text"
                                    placeholder="negro,blanco,rojo"
                                    onChange={handleColor}
                                />
                            </div>
                            <div className="addProductItem">
                                <label>Stock</label>
                                <select name="iiStock" onChange={handleChange}>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <button onClick={handleClick} className="addProductButton">Create</button>
                        </form>
                    </div>
                )
            }
        </>
    );
}