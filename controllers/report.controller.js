import Report from "../models/report.js";

export const registerReport = async (req, res) => {
    const { nameOfReporter, emailOfReporter, phonenum, nameOfMinister, church, emailOfReported, offense } = req.body;

    try {
      
        if (!nameOfReporter || !emailOfReporter || !phonenum || !nameOfMinister || !church || !emailOfReported || !offense) {
            return res.status(400).json({ message: "All fields must be filled" });
        }

     
        const report = new Report({ 
            nameOfReporter, 
            emailOfReporter, 
            phonenum, 
            nameOfMinister, 
            church, 
            emailOfReported, 
            offense 
        });
        
        await report.save();


        return res.status(201).json({ message: "Report successfully registered", report });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getAllReport =async(req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}