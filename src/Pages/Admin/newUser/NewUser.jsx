import './NewUser.css'

const NewUser = () => {
  return (
    <div className='newUser'>
        <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" action="">
            <div className="userCreateItemsList">
              <div className="userCreateItem">
                <label>User name</label>
                <input type="text" name="Username" placeholder='example' />
              </div>
              <div className="userCreateItem">
                <label>Full name</label>
                <input type="text" name="Fullname" placeholder='Snow' />
              </div>
              <div className="userCreateItem">
                <label>Email</label>
                <input type="text" name="Email" placeholder='example@gmail.com' />
              </div>
              <div className="userCreateItem">
                <label>Password</label>
                <input type="Password" name="Password" placeholder='Password' />
              </div>
              <div className="userCreateItem">
                <label>Phone</label>
                <input type="text" name="Phone" placeholder='+1 123 456 78' />
              </div>
              <div className="userCreateItem">
                <label>Address</label>
                <input type="text" name="Address" placeholder='Egypt|EG' />
              </div>
              <div className="userCreateItem">
                <label>Gender</label>
                <div className="userCreateGender">
                    <input type="radio" name="Male" id="Male" value='Male' />
                    <label for="Male">Male</label>
                    <input type="radio" name="Female" id="Female" value='Female' />
                    <label for="Female">female</label>
                </div>
              </div>
              <div className="userCreateItem">
                <label>Active</label>
                <select name="active" id="active">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
              </div>
            </div>
            <button className='userCreateBtn' onClick={()=>{}}>Create</button>
          </form>
    </div>
  )
}

export default NewUser