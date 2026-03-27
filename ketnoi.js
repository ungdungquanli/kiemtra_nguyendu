/* ========================================================================== */

const ddungdwe = "https://script.google.com/macros/s/AKfycbys_v4n0ZrCV0ZnW98QHmHGtynI8V4cbeEHCz51y3XnYr3QBOfPoXBM7YPI8nhNrxEyIw/exec"; 

let taikngd = "";
try { taikngd = sessionStorage.getItem("SKT_USER_TAIK") || ""; } catch(loie) { console.warn("Chrome chặn Storage khởi tạo"); }

const google = {
    script: {
        run: taodoitcha()
    }
};

function taodoitcha(khitcong = null, khitba = null) {
    return new Proxy({}, {
        get: function(doit, thuoct) {
            if (thuoct === 'withSuccessHandler') return function(cb1) { return taodoitcha(cb1, khitba); };
            if (thuoct === 'withFailureHandler') return function(cb1) { return taodoitcha(khitcong, cb1); };
            
            return function(...mtham) {
                try {
                    taikngd = window.skttktoanc || sessionStorage.getItem("SKT_USER_TAIK") || "";
                } catch(loie) {
                    taikngd = window.skttktoanc || "";
                }
                thuchmays(thuoct, mtham, khitcong, khitba);
            };
        }
    });
}

function thuchmays(hdong, mtham, khitcong, khitba) {
    let tso = {};
    if (hdong === "skt_laybg_mahs") tso = { mhso: mtham[0] };
    else if (hdong === "skt_luubg_nha") tso = { mdl: mtham[0] };
    else if (hdong === "skt_nopbg_cuo") tso = { mdl: mtham[0] };
    else if (hdong === "skt_xoadon_nki_thc") tso = { mhso: mtham[0] };
    else if (hdong === "skt_tainhiu_tep") tso = { dltep: mtham[0], mhso: mtham[1], idtm: mtham[2], ddcu: mtham[3], cdghi: mtham[4] };
    else if (hdong === "skt_taitm_minhc") tso = { idcha: mtham[0], tentmu: mtham[1], dltep: mtham[2], ddcu: mtham[3], cdghi: mtham[4] };
    else if (hdong === "skt_timbg_kq") tso = { tchi: mtham[0] };
    else if (hdong === "skt_taobc_vba") tso = { tchi: mtham[0] };
    else if (hdong === "skt_laydl_bda") tso = { taik: mtham[0], cnh: mtham[1] };
    else if (hdong === "skt_laytm_con") tso = {};
    else if (hdong === "skt_tk_laydl_loc") tso = {};
    else if (hdong === "skt_layds_mhs_cn") tso = {};

    fetch(ddungdwe, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ hdong: hdong, tso: tso, taik: taikngd })
    })
    .then(ph => ph.json())
    .then(ph => {
        if (ph.trth === "tcon") { if (khitcong) khitcong(ph.dliu); } 
        else { if (khitba) khitba(new Error(ph.tbao)); else alert("Lỗi Server: " + ph.tbao); }
    })
    .catch(loie => {
        if (khitba) khitba(loie); else console.error("Lỗi Fetch:", loie);
    });
}
