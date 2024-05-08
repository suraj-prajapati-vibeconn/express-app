import transporter from '../mail/mailConfig';

type UserContactedData = {
    name: string,
    email: string,
}
const sendMail = async (user: UserContactedData) => {

    try {
        const { name, email } = user;
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
            to: email,
            subject: "Acknowledgement mail",
            text: "Thank you for contacting",
            html: "<h1>Express app</h1> <p>We will contact you shortly </p>",
        });

        if (info.accepted.length !== 0) {
            return {
                success: true,
                message: 'Email sent successfully',
                info: info
            }
        } else {
            return {
                success: false,
                message: 'Email not sent'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Some error occured',
            error
        }
    }
};

export default sendMail;
