var express = require('express');
var router = express.Router();
var common = require('../models/common');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-login');
const CryptoJS = require('crypto-js');
const key = '&World709rrt';

var bcrypt = require('bcryptjs');

router.get('/getBlock/:district_code', function(req, res) {
    common.getBlock(req.params.district_code, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/checkUsernameExist/:username', function(req, res) {
    common.checkUsernameExist(req.params.username, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/getDistrict', function(req, res) {
    common.getDistrict(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});


router.get('/dept', function(req, res) {
    common.getdept(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/uploadmenu', function(req, res) {
    common.getuploadmenu(function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});



router.get('/deptlinks/:dept_id', function(req, res, next) {
    common.deptlinks(req.params.dept_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
    // var dept_id= req.params.dept_id;


    // db.query(`select * from upload_data where dept_id  = ?`,
    // [dept_id],function(error,results,field)    
    // {if (error) throw error;
    //   res.json(results);
    // } )

});



router.get('/getPatientsByDate', checkAuth, function(req, res) {
    common.getPatientsByDate(req.query, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/getCountDetails', checkAuth, function(req, res) {
    common.getCountDetails(req.query, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/getHealthCenter/:district_code', checkAuth, function(req, res) {
    common.getHealthCenter(req.params.district_code, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/getDashboardCount/:SHC_id', checkAuth, function(req, res) {
    common.getDashboardCount(req.params.SHC_id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows[0]);
        }
    });
});

router.put('/updateAction', checkAuth, function(req, res) {

    common.updateAction(req.body, function(err, rows1) {
        if (err) {
            res.json(err);
        } else {
            res.json({ success: true, message: 'Updtaed Success.' });
        }
    });
});


router.put('/updateRevisit', checkAuth, function(req, res) {

    common.updateRevisit(req.body, function(err, rows1) {
        if (err) {
            res.json(err);
        } else {
            res.json({ success: true, message: 'Updtaed Success.' });
        }
    });
});



//#region for ALL USERS
router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // var password = CryptoJS.AES.decrypt(req.body.password, key).toString(CryptoJS.enc.Utf8);
    common.login(username, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            if (!rows.length) {
                res.json({
                    success: 0,
                    message: `Wrong credential.`
                })
            } else {

                let user = JSON.parse(JSON.stringify(rows[0]));

                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err) {
                        return res.json({
                            success: 0,
                            message: `Wrong credential.`
                        });
                    } else if (result) {
                        console.log(result);
                        let response = {
                            username: user.user_name,
                            role: user.role

                        }
                        const token = jwt.sign(response, 'SECreTIsAlwaYSSecRET');
                        res.json({ token: token, success: 1, role: user.role, message: 'Login Success' });
                    } else {
                        res.json({
                            success: 0,
                            message: `Wrong credential.`
                        })
                    }
                });
            }
        }
    });

});

router.put('/changepassword', checkAuth, function(req, res) {

    var deNEWpassword = CryptoJS.AES.decrypt(req.body.Newpassword, key).toString(CryptoJS.enc.Utf8);
    var depassword = CryptoJS.AES.decrypt(req.body.password, key).toString(CryptoJS.enc.Utf8);

    common.getCurrentpassword(req.body.username, req.body.UserTypeCode, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows[0]);
            if (depassword == rows[0].password) {
                common.changepassword(deNEWpassword, req.body.username, req.body.UserTypeCode, function(err, rows1) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({ success: true, message: 'password changed.' });
                    }
                });
            } else {
                res.json({ success: false, message: 'वर्तमान पासवर्ड गलत है !' });
            }
        }
    });
});
//#endregion ALL USERS


module.exports = router;