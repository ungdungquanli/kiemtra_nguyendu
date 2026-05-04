/**
 * INTERNAL API BRIDGE - TRƯỜNG TIỂU HỌC NGUYỄN DU
 * Hệ thống: Sổ Kiểm Tra Nội Bộ (SKT)
 * Mục đích: Cầu nối giao tiếp (Fetch API) giữa giao diện Web App (GitHub) và Google Apps Script.
 * Phiên bản: Xác thực Mã PIN 2 lớp Tự trị (Server-side) + Thuật toán ánh xạ dòng động
 */

// THẦY HÃY THAY ĐƯỜNG LINK DƯỚI ĐÂY BẰNG LINK WEB APP (đuôi /exec) CỦA DỰ ÁN SỔ KIỂM TRA NÀY:
const GAS_URL = "https://script.google.com/macros/s/AKfycbys_v4n0ZrCV0ZnW98QHmHGtynI8V4cbeEHCz51y3XnYr3QBOfPoXBM7YPI8nhNrxEyIw/exec";

function createRunner(onSuccess, onFailure) {
    return {
        withSuccessHandler: function(cb) {
            return createRunner(cb, onFailure);
        },
        withFailureHandler: function(cb) {
            return createRunner(onSuccess, cb);
        },
        _call: function(hdong, tso) {
            const sysId = window.skttktoanc || sessionStorage.getItem("SKT_USER_TAIK") || ""; 

            fetch(GAS_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ hdong: hdong, tso: tso, taik: sysId })
            })
            .then(res => res.json())
            .then(res => {
                if (res.trth === "tcon") {
                    if (onSuccess) onSuccess(res.dliu);
                } else {
                    if (onFailure) onFailure(new Error(res.tbao));
                    else console.error("Lỗi từ máy chủ Google:", res.tbao);
                }
            })
            .catch(err => {
                if (onFailure) onFailure(err);
                else console.error("Lỗi mất kết nối:", err);
            });
        },
        
        // DANH SÁCH API CỦA HỆ THỐNG SỔ KIỂM TRA
        skt_laydl_bda: function(taik, cnh) { this._call('skt_laydl_bda', { cnh: cnh }); },
        skt_laybg_mahs: function(mhso) { this._call('skt_laybg_mahs', { mhso: mhso }); },
        skt_luubg_nha: function(mdl) { this._call('skt_luubg_nha', { mdl: mdl }); },
        skt_nopbg_cuo: function(mdl) { this._call('skt_nopbg_cuo', { mdl: mdl }); },
        skt_layds_mhs_cn: function() { this._call('skt_layds_mhs_cn', {}); },
        skt_xoadon_nki_thc: function(mhso) { this._call('skt_xoadon_nki_thc', { mhso: mhso }); },
        skt_laytm_con: function() { this._call('skt_laytm_con', {}); },
        skt_tainhiu_tep: function(dltep, mhso, idtm, ddcu, cdghi) { this._call('skt_tainhiu_tep', { dltep: dltep, mhso: mhso, idtm: idtm, ddcu: ddcu, cdghi: cdghi }); },
        skt_taitm_minhc: function(idcha, tentmu, dltep, ddcu, cdghi) { this._call('skt_taitm_minhc', { idcha: idcha, tentmu: tentmu, dltep: dltep, ddcu: ddcu, cdghi: cdghi }); },
        skt_tk_laydl_loc: function() { this._call('skt_tk_laydl_loc', {}); },
        skt_timbg_kq: function(tchi) { this._call('skt_timbg_kq', { tchi: tchi }); },
        skt_taobc_vba: function(tchi) { this._call('skt_taobc_vba', { tchi: tchi }); },
        skt_pt_mc_ai: function(chuoilk, yeucau) { this._call('skt_pt_mc_ai', { chuoilk: chuoilk, yeucau: yeucau }); },
        skt_notebooklm_qa: function(question) { this._call('skt_notebooklm_qa', { question: question }); },
        
        // BỘ ĐỊNH TUYẾN MỚI CHO BẢO MẬT 2 LỚP TỰ TRỊ
        skt_ktra_trangthai_qr: function(chuoi_dinhdanh) { this._call('skt_ktra_trangthai_qr', { chuoi_dinhdanh: chuoi_dinhdanh }); },
        skt_xacthuc_qr: function(chuoi_dinhdanh, khoa_nhap, kieu_xthuc, khoa_moi) { this._call('skt_xacthuc_qr', { chuoi_dinhdanh: chuoi_dinhdanh, khoa_nhap: khoa_nhap, kieu_xthuc: kieu_xthuc, khoa_moi: khoa_moi }); }
    };
}

const google = {
    script: {
        get run() {
            return createRunner(null, null);
        }
    }
};
