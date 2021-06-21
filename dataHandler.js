const fs = require('fs/promises');
const people_data = 'data_people.json'

var readAllData = async function(){
    return fs.readFile(people_data)
        .then((result) =>{
            result_in_json = JSON.parse(result);
            // console.log(result_in_json)
            return result_in_json;
        })
        .catch((err) => {
            return err;
        });
}

var getDetailById = async function getDetailById(people_id){
    // return detailById, message
    return fs.readFile(people_data)
        .then((result) => {
            result_in_json = JSON.parse(result);
            
            // console.log(result_in_json[0])
            var index_run = 0
            var index_json = 0
            Object.values(result_in_json).forEach(data => {
                if (data.id == people_id){
                    // console.log(data);
                    index_json = index_run;
                }
                index_run += 1;
            });
            // console.log("index json : ", index_json)
            if (index_json == 0 && index_json != index_run){
                message = {
                    message: 'no result, your id is not found',
                    status_code: 404,
                    err: true
                }
                return message;
            }
            else{
                return result_in_json[index_json];
            }
        });
}

var createData = function createData(data_people){
    return fs.readFile(people_data)
        .then((result) => {
            result_in_json = JSON.parse(result)
            result_in_json.push(data_people)
            console.log(
                "masuk gan"
            )
            return fs.writeFile(people_data, JSON.stringify(result_in_json))
                .then((result) =>{
                    console.log(
                        "iso write"
                    )
                    return data_people;
                })
                .catch( err => {
                    return err;
                })
        })
        .catch( err => {
            return err;
        })
}

function getDetailByQuery(q){
    var pattern_regex = ""
    pattern_regex = q.toLowerCase().split("").map(
        (x)=>{
            return `(?=.*${x})`
        }
    ).join("");

    return fs.readFile(people_data)
        .then((result) => {
            // console.log("test masuk")
            result_in_json = JSON.parse(result)
            var validate = new RegExp(`${pattern_regex}`, "g");
            var filtered = result_in_json.filter(e =>
                e.first_name.toLowerCase().match(validate) || 
                e.last_name.toLowerCase().match(validate) ||
                e.adress.toLowerCase().match(validate) ||
                e.age.toString().toLowerCase().match(validate)
                );
            // console.log(filtered)
            return filtered
            })
        .catch(err => {
            return err;
        })
}

var deleteById = function deleteById(people_id){
    return fs.readFile(people_data)
        .then((result) => {
            result_in_json = JSON.parse(result)
            new_data_after_remove = result_in_json.filter(data => data.id != people_id);
            return fs.writeFile(people_data, JSON.stringify(new_data_after_remove))
                .then((result) =>{
                    return {
                        message : 'success delete data'
                    }
                })
                .catch( err => {
                    console.log(err)
                    return err;
                })
        })
        .catch(err => {
            console.log(err)
            return err;
        })
}

module.exports = {
    readAllData : readAllData,
    getDetailById: getDetailById,
    createData: createData, 
    deleteById: deleteById, 
    getDetailByQuery: getDetailByQuery
}