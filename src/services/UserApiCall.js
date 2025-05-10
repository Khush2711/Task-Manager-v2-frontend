import axios from "axios";
import toast from 'react-hot-toast'

export async function LoginAPI(data) {
    try {

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/login";

        let loginData = await axios.post(baseUrl, data);

        //console.log("Login Data............", loginData);

        toast.success("Login Successfully....");

        return loginData;

    } catch (error) {
        //console.log("Error occured in Login().....", error);
        toast.error(error?.response?.data?.message || "Login Failed....");

    }
}

export async function getUsers(token) {
    try {

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/users";

        let userList = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        //console.log("UserList............", userList);

        return userList;

    } catch (error) {
        //console.log("Error occured in getUsers().....", error);
    }
}

export async function LogoutUser(data) {
    try {

        // const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/login";

        localStorage.removeItem("token");
        localStorage.removeItem("sys");

    } catch (error) {
        //console.log("Error occured in LogoutUser().....", error);
        toast.error(error?.response?.data?.message || "logout Failed....");

    }
}

export async function sendOTP(data) {
    try {

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/sendotp";

        let sendotp = await axios.post(baseUrl,data);

        // //console.log("sendotp............", sendotp);
        return sendotp;

    } catch (error) {
        //console.log("Error occured while sending sendOTP.....", error);
        toast.error(error?.response?.data?.message || "OTP not sent....")
    }
}


export async function signupAPI(data) {
    try {

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/signup";

        let sendotp = await axios.post(baseUrl,data);

        //console.log("sendotp............", sendotp);

        return sendotp;

    } catch (error) {
        //console.log("Error occured while signing up.....", error);
        toast.error(error?.response?.data?.message || "Signup fail....")
    }
}

export async function resetPasswordToken(email) {
    try {

        //console.log("email.....................",{email});

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/reset-password-token";

        let sendotp = await axios.post(baseUrl,{email});

        //console.log("resetPasswordToken............", sendotp);

        return sendotp;

    } catch (error) {
        //console.log("Error occured in resetPasswordToken().....", error);
        toast.error(error?.response?.data?.message || "Wrong Email....")
    }
}


export async function updatePassword(body) {
    try {

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/reset-password";

        let updatePasswordResponse = await axios.post(baseUrl,body);

        //console.log("updatePassword............", updatePasswordResponse);

        return updatePasswordResponse;

    } catch (error) {
        //console.log("Error occured in updatePassword().....", error);
        toast.error(error?.response?.data?.message || "Wrong Email....")
    }
}
