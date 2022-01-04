const transporter = require("./config/email");
const axios = require("axios");

module.exports = async function sendEmail() {
  try {
    const { data } = await axios.get("http://localhost:8000/admin/sendsms");
    if (data.length) {
      data.map(async (user) => {
        const info = await transporter.sendMail({
          to: `${user.email}`,
          from: {
            name: "JB Projects",
            address: "njugunajb96@gmail.com",
          },
          subject: `Welcome Onboard, ${user.username}!!`,
          html: `
                          <div>
                              <h4>Welcome To JB Projects,<h4/>
                  
                              <p>You have made a great step in creating your account,<br />
                                  We are a company committed to delivering the best of projects <br />
                                  to our wide range of clients around the world.
                              <p/>
                  
                              <p>
                                  Please be informed of the strict policies we follow as per the company guidelines. <br />  
                              <p/>
                  
                              <br />
                  
                              <p>You will be assigned a project soon.<p/>
                              <p>See you soon.</p>
                  
                              <br />
                              <br />
                              <br />
                  
                              <p>Regards:<strong>John Brian<strong/> <i>CEO,JB Projects<i/><p/>
                  
                              <br />
                  
                              <img src="cid:uniqueID" alt="jbimage" />
                      
                          <div/>`,
          attachments: [
            {
              filename: "jbprojects.png",
              path: "https://tinyurl.com/ect3jbef",
              cid: "uniqueID",
            },
          ],
        });
      });
    }
  } catch (error) {
    console.log("Error");
  }
};
