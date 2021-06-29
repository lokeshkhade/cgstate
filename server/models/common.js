var db = require('../dbconnection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var common = {

    getBlock: function(district_code, callback) {
        db.query(`SELECT DISTINCT BlockCode,BlockName FROM alldistrictblocksofcgs WHERE DistrictCode=? ORDER BY BlockName ASC`, [district_code], callback);
    },

    getuserid: function(dept_id, callback) {
        db.query(`select * from mas_users where dept_id  = ?`, [dept_id], callback);
    },

    getdeptdata: function(dept_id, callback) {
        db.query(`select * from mas_dept where dept_id  = ?`, [dept_id], callback);
    },

    getdeptbanner: function(dept_id, callback) {
        db.query(`select * from main_banner where dept_id  = ? and isactive='Y' and imagetype='B'`, [dept_id], callback);
    },

    getdeptgallery: function(dept_id, callback) {
        db.query(`select * from main_banner where dept_id  = ? and isactive='Y' and imagetype='G'`, [dept_id], callback);
    },

    getdeptidbydomainname: function(domain_name, callback) {
        db.query(`Select dept_id from mas_dept where domain_name  = ?`, [domain_name], callback);
    },

    getDistrict: function(callback) {
        db.query(`SELECT DISTINCT DistrictCode,DistrictName FROM alldistrictblocksofcgs ORDER BY DistrictName ASC`, callback);
    },

    getdept: function(callback) {
        db.query(`SELECT *, '' as sn from mas_dept`, callback);
    },


    getnoticeboard: function(callback) {
        db.query(`select * from upload_data where dept_id = 1 and isactive='Y'  LIMIT 5`, callback);
    },

    getdeptcard: function(dept_id, callback) {
        db.query(`select * from main_card where isactive='Y' and dept_id  = ? order by issuedate`, [dept_id], callback);
    },

    getdeptnoticeboard: function(dept_id, callback) {
        db.query(`select * from upload_data where dept_id  = ? and isactive='Y' order by issuedate LIMIT 5 `, [dept_id], callback);
    },

    getuploadmenu: function(callback) {
        db.query(`select * from mas_menu where  uploadflag = 'Y'  and flag='Y'`, callback);
    },

    getreportmenu: function(callback) {
        db.query(`select * from mas_menu where  uploadflag = 'Y'  and flag='G'`, callback);
    },

    getdesignation: function(callback) {
        db.query(`select designation_id,designation_name_hindi from mst_designation`, callback);
    },

    getorganization: function(callback) {
        db.query(`select org_name,org_link from main_org_table where org_type = 'E'`, callback);
    },


    getimpinformation: function(dept_id, callback) {
        db.query(`select * from main_importantlink where dept_id  = ? order by issuedate LIMIT 5 `, [dept_id], callback);
    },


    getallimpinformation: function(dept_id, callback) {
        if (dept_id != 0) {
            db.query(`select *,'' as sn from main_importantlink where dept_id  = ? order by issuedate  `, [dept_id], callback);
        } else {
            db.query(`select *,'' as sn from main_importantlink order by issuedate `, callback);
        }

    },

    ////////////////////////////////////////////////////////////


    getwhatnew: function(dept_id, callback) {
        db.query(`select * from main_news where dept_id  = ? order by issuedate LIMIT 3 `, [dept_id], callback);
    },


    getallwhatnew: function(dept_id, callback) {
        if (dept_id != 0) {
            db.query(`select *,'' as sn from main_news where dept_id  = ? order by issuedate  `, [dept_id], callback);
        } else {
            db.query(`select *,'' as sn from main_news order by issuedate `, callback);
        }

    },

    ///////////////////////////////////////////////////////


    getalldeptaboutus: function(id, callback) {
        if (id != 0) {
            db.query(`select *,'' as sn from main_aboutus where id  = ? and isactive='Y' order by issuedate  `, [id], callback);
        } else {
            db.query(`select *,'' as sn from main_aboutus and isactive='Y' order by issuedate `, callback);
        }
    },


    /////////////////////////////////////////////////////

    getdeptaboutus: function(dept_id, callback) {
        db.query(`select * from main_aboutus where dept_id  = ? and isactive='Y' order by issuedate `, [dept_id], callback);
    },

    getdeptcontact: function(dept_id, callback) {
        db.query(`select * from main_contact where dept_id  = ? and isactive='Y' order by issuedate `, [dept_id], callback);
    },


    getalldeptcontactus: function(id, callback) {
        if (id != 0) {
            db.query(`select *,'' as sn from main_contact where id  = ? and isactive='Y' order by issuedate  `, [id], callback);
        } else {
            db.query(`select *,'' as sn from main_contact and isactive='Y' order by issuedate `, callback);
        }
    },

    getdownload: function(dept_id, callback) {
        db.query(`select * from main_download where dept_id  = ? and isactive='Y' order by issuedate `, [dept_id], callback);
    },

    getalldeptdownload: function(id, callback) {
        if (id != 0) {
            db.query(`select *,'' as sn from main_download where id  = ? and isactive='Y' order by issuedate  `, [id], callback);
        } else {
            db.query(`select *,'' as sn from main_download and isactive='Y' order by issuedate `, callback);
        }
    },

    //////////////////////////////////////////////////////////////

    getdeptlist: function(callback) {
        db.query(`select * from main_department WHERE isactive='Y' and display = 'M' ORDER BY dept_id`, callback);
    },

    getalldeptlist: function(dept_id, callback) {

        if (dept_id != 0) {
            db.query(`select *,'' as sn from main_department where isactive='Y'and dept_id  = ?`, [dept_id], callback);
        } else {
            db.query(`select *,'' as sn from main_department where isactive='Y' `, callback);
        }
    },

    /////////////////////////////////////////////////////

    getreports: function(callback) {
        db.query(`select * from main_reports WHERE isactive='Y' ORDER BY menu_code`, callback);
    },

    getallreports: function(menu_code, callback) {

        if (menu_code != 0) {
            db.query(`select *,'' as sn from main_reports where isactive='Y'and menu_code  = ?`, [menu_code], callback);
        } else {
            db.query(`select *,'' as sn from main_reports where isactive='Y' `, callback);
        }
    },

    ////////////////////////////////////////////

    getscheme: function(callback) {
        db.query(`select * from main_scheme`, callback);
    },

    getdirectory: function(designation_id, callback) {
        if (designation_id != 0) {
            db.query(`SELECT '' as sn, cd.name, md.designation_name_hindi, cd.cont_office_no,cd.office_address  FROM contact_details cd INNER JOIN mst_designation md ON cd.department_id = md.department_id WHERE md.is_active='Y' AND  md.designation_id = ?`, [designation_id], callback);
        } else {
            db.query(`SELECT '' as sn, cd.name, md.designation_name_hindi, cd.cont_office_no,cd.office_address  FROM contact_details cd INNER JOIN mst_designation md ON cd.department_id = md.department_id WHERE md.is_active='Y'`, callback);
        }
    },

    deptlinks: function(dept_id, callback) {
        if (dept_id != 0) {
            db.query(`select *,'' as sn from upload_data where dept_id  = ? and isactive='Y'`, [dept_id], callback);
        } else {
            db.query(`select *,'' as sn from upload_data where isactive='Y'`, callback);
        }

    },

    deptlinksbytype: function(dept_id, menu_code, callback) {
        db.query(`select *,'' as sn from upload_data where dept_id  = ? and menu_code = ? and  isactive='Y'`, [dept_id, menu_code], callback);
    },



    ////////////////////////////////////////////////////////


    checkUsernameExist: function(username, callback) {
        db.query(`SELECT COUNT(*) AS notavail FROM users u WHERE u.username=?`, [username], callback);
    },

    getDashboardCount: function(SHC_id, callback) {
        db.query(`SELECT TH.SHC_id
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id) AS total
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and Kit_given='Y') AS Kit_given
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and Untracable='Y') AS Untracable
        ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and HospCcode is not NULL) AS Hospitalize
         ,(select count(*) from tbl_HomeCare where TH.SHC_id=tbl_HomeCare.SHC_id and Death_date is not NULL) AS Death
        FROM tbl_HomeCare TH  where TH.SHC_id='${SHC_id}' GROUP BY TH.SHC_id`, callback);
    },


    //#region All USER
    login: function(username, callback) {
        db.query(`select d.domain_name,  d.deptname_en,d.deptname_hn, u.password, u.user_id, u.user_name, u.dept_id, u.role from mas_users u left JOIN mas_dept d ON u.dept_id=d.dept_id WHERE u.user_id=?`, [username], callback);
    },

    getCurrentPassword: function(user_id, role, callback) {

        return db.query(`select password from mas_users WHERE user_id = ${user_id} AND role = ${role}`, callback);

    },
    changePassword: function(password, user_id, role, callback) {

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                console.log(`update mas_users set password = '${hash}' where user_id = ${user_id} AND role = ${role}`);
                return db.query(
                    `update mas_users set password = '${hash}' where user_id = ${user_id} AND role = ${role}`,
                    callback);
            });
        });

    },
    //#endregion USER
};
module.exports = common;