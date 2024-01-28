import './NewProduct.css'
import verctorImg from '../../../assists/images/pngwing.com.png'

export default function NewProduct() {
  return (
    <div className='newProduct'>
        <div className="newProductTitle">New Product</div>
        <div className="createProductsContainer">
          <form className="createProduct">
            <div className="createProductInfo">
              <label>Image</label>
              <input type="file" name="Image" id="Image" />
              <label>Name</label>
              <input type="text" name="Camera" placeholder='Camera' />
              <label>Price</label>
              <input type="text" name="Price" placeholder='$120.5' />
              <label>Stock</label>
              <input type="text" name="Stock" placeholder='123' />
              <label>Status</label>
              <select name="Status" id="Status">
                <option value="onStock">On Stock</option>
                <option value="outStock">Out Stock</option>
              </select>
            </div>
            <button className="createProductBtn">Create</button>
          </form>
          <div className="verctorImage">
            <img src={verctorImg} alt="" />
          </div>
        </div>
    </div>
  )
}
