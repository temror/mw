class USerController {
    async createUser(req,res){
     const { name,surname } = req.body
        console.log(name,surname)
        res.json('ok')
    }
    async getUsers(req,res){
         res.json({
             "hi" : "Bye"
         })
    }
    async getUSer(req,res){

    }
    async updateUSer(req,res){

    }
    async deleteUser(req,res){

    }
}

module.exports = new USerController()