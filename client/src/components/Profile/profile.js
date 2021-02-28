import React, { useState, useEffect } from 'react';
import './profile.css'
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Profile() {

    // false = ยังไม่ได้กด edit
    const [edit, setedit] = useState(false);
    //ข้อมูลโปรไฟล์
    const [profile, setprofile] = useState([]);
    //ข้อมูลเมื่อมีการแก้ไข
    // const [newProfile, setnewProfile] = useState([])
    const [newFirst, setnewFirst] = useState("");
    const [newPhone, setnewPhone] = useState("");
    const [newAddress, setnewAddress] = useState("");

    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const currentUser = localStorage.getItem('currentUser')
    const currentUser_email = localStorage.getItem('currentUser_email')
    const currentUser_phone = localStorage.getItem('currentUser_phone')
    const currentUser_address = localStorage.getItem('currentUser_address')
    const currentUser_id = localStorage.getItem('currentUser_id')

    const CancelUpdate = () => {
        setedit(false);
    }

    function handleEditProfile() {
        setedit(true);
    }



    function handleFirstname(value) {
        setnewFirst(value);

    }
    function handleFirstPhone(value) {
        setnewPhone(value);

    }
    function handleFirstAddress(value) {
        setnewAddress(value);

    }
    // อัพเดตโปรไฟล์
    function confirmUpdate() {
        console.log('00000000')
        console.log(address)
        console.log(phone)
        console.log(currentUser_id)

        const formData = new FormData();
        formData.append('address', address)
        formData.append('phone', phone)
        Axios.post('/profile/123', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res)
            if (res.data.name) {
                window.alert("Error: " + res.data.message)
                console.log("error")
            } else {
                console.log("successful")
                // window.location.href = "http://localhost:3000/Login"
            }
        }).catch(error => console.log(error))
    }


    useEffect(() => {

        const getprofile = () => {

            //fetch from server

            //ข้อมูล Demo
            setprofile(
                {

                    name: "june",
                    phone: "28178799812",
                    address: "พระราชวัง ประเทศอังกฤษ",
                    email: "june@gamil.com"

                }
            )
        }

        getprofile();

    }, [])


    return (
        <div className="container">
            <div className="box">
                <section>
                    {edit ?
                        //สามารถแก้ไขๆด้
                        (
                            <div>
                                <div className="box-text">
                                    <h1> ประวัติส่วนตัว</h1>
                                    <div className="textinforuser">
                                        <span> <i className="fa fa-user"> </i> ชื่อ-นามสกุล</span>
                                        {/* <p>เจมส์ จิรายุ</p> */}
                                        <input type="text" value={newFirst} onChange={(e) => { handleFirstname(e.target.value) }}></input>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-phone"> </i> เบอร์โทรศัพท์</span>
                                        {/* <p>098-9847077</p> */}
                                        <input type="text" name='phone' onChange={(e) => { setPhone(e.target.value) }}></input>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-address-card"> </i> ที่อยู่</span>
                                        <input type="text" name='address' onChange={(e) => { setAddress(e.target.value) }}></input>
                                        {/* <p>129 ซ.สุขสวัสดิ์ 26 แยก 10-5 แขวงบางปะกอก เขตราษฎร์บูรณะ กทม.10140</p> */}
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-envelope"> </i> อีเมล</span>

                                        <p>{currentUser_email}</p>
                                    </div>
                                    <div className="confirm-and-cancelEditProfile">
                                        <div className="confirmEditProfile">
                                            <button className="button" onClick={confirmUpdate}>บันทึก</button>
                                        </div>
                                        <div className="cancelEditProfile">
                                            <button className="button" onClick={CancelUpdate}>ยกเลิก</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )

                        :
                        //ข้อมูลปกติ
                        (
                            <div>
                                <div className="box-text">
                                    <h1> ประวัติส่วนตัว</h1>
                                    <div className="textinforuser">
                                        <span> <i className="fa fa-user"> </i> ชื่อ-นามสกุล </span>
                                        <p>{currentUser}</p>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-phone"> </i> เบอร์โทรศัพท์</span>
                                        <p>{currentUser_phone}</p>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-address-card"> </i> ที่อยู่</span>
                                        <p>{currentUser_address}</p>
                                    </div>
                                    <div className="textinforuser">
                                        <span> <i className="fas fa-envelope"> </i> อีเมล</span>
                                        <p>{currentUser_email}</p>
                                    </div>


                                    <div className="btn-bottom-profile">
                                        <div className="EditProfile">
                                            <button className="button" onClick={handleEditProfile}>แก้ใข</button>
                                        </div>
                                        <div className="Like">
                                            <Link to="/profile/favorite"><i className="fab fa-gratipay"></i></Link>
                                            {/* <Link  to={item.href}></Link> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )

                    }







                </section>


            </div>
            <div className="Post">
                <p>Post ของฉัน </p>
            </div>
        </div>

    )
}




export default Profile;