using Base.Models;
using System.Linq;
using System.Collections.Generic;
using DbAdm.Models;
//using KinmenEntity;
using Base.Services;

namespace DbAdm.Services
{
    //課程相關
    public class LoginService
    {
        /*
        //return error msg if any
        //checkPwd: 是否檢查密碼
        public ErrorModel UserLogin(string email)
        {
            _Session.Reset();

            //檢查user資料是否正確
            var error = new ErrorModel();

            //寫入 session
            var sess = new SessionModel();
            sess.IsLogin = true;
            sess.UserId = email;
            sess.UserName = email;
            //sess.DeptId = user.DeptId;
            //sess.DeptName = user.DeptName;

            //sess.OrgId = user.OrgId;
            //sess.OrgName = user.OrgName;
            //sess.OldOrgId = user.OrgId;   //重要 !!


            //產生menu
            //sess.Progs = progs.Select(a => a.ProgId).ToList();
            //sess.Menus = ProgsToMenus(db.Program.ToList(), sess.Progs);

            //寫入 session
            _Session.Write(sess);
            return error;
        }
        */

        /*
        //get program list by role id
        private List<Program> GetProgsByRole(string roleId)
        {
            using (var db = new kinmenEntities())
            {
                //讀取有權限的程式清單
                //如果是總管理者, 則讀取全部功能
                //List<Program> progs = null;
                //總管理者
                if (roleId == _Xp.GetAdminRoleId())
                {
                    return (from a in db.Program
                            where a.Status
                            select a).ToList();
                }
                else
                {
                    return (from a in db.RoleProg
                            join p in db.Program on a.ProgId equals p.Id
                            where a.RoleId == roleId && a.Status
                            select p).ToList();
                }
            }            
        }

        //切換機關
        //不會重新設定 session.OldRoleId
        public ErrorModel SwitchOrg(string orgId)
        {
            //檢查角色是否存在
            var userId = _Session.UserId;
            using (var db = new kinmenEntities())
            {
                //check UserOrg first
                var row = (from a in db.UserOrg
                           join o in db.Org on a.OrgId equals o.Id
                           join r in db.Role on a.RoleId equals r.Id
                           where a.UserId == userId && a.OrgId == orgId
                           select new
                           {
                               IsAdmin = false,     //一定為 false
                               OrgName = o.Name,
                               RoleId = a.RoleId,
                               RoleName = r.Name,
                           }).FirstOrDefault();

                if (row == null)
                {
                    if (orgId != _Session.OldOrgId)
                        return new ErrorModel() { ErrorMsg = "群組資料不存在, 無法切換 !!" };

                    //case of ok
                    return UserLogin(userId, "", false);
                }

                //切換機關
                //get role program list & set session
                var progs = GetProgsByRole(row.RoleId);
                var list = progs.Select(a => a.ProgId).ToList();
                _Session.IsAdmin = row.IsAdmin;
                _Session.RoleId = row.RoleId;
                _Session.RoleName = row.RoleName;
                _Session.OrgId = orgId;
                _Session.OrgName = row.OrgName;
                _Session.Progs = list;
                _Session.Menus = ProgsToMenus(db.Program.ToList(), list);
            }

            return new ErrorModel();
        }

        //模擬帳號
        public ErrorModel SwitchUser(string userId)
        {
            return UserLogin(userId, "", false);
        }

        //convert to programs to menu list
        private List<MenuDto> ProgsToMenus(List<Program> all, List<string> progs)
        {
            //data for return
            //var progs = new List<string>();
            var data = new List<MenuDto>();

            //第1層(最上層, UpId空白, 總共3個項目, Sort:1,2,3)
            var list1 = all
                .Where(a => string.IsNullOrEmpty(a.UpId))
                .OrderBy(a => a.Sort)
                .ToList();
            foreach (var r1 in list1)
            {
                var addMenu1 = false;
                var menu1 = new MenuDto()
                {
                    Id = r1.Id,
                    Name = r1.Name,
                    Url = r1.Url,
                    Sort = r1.Sort,
                    Icon = r1.Icon,
                };

                //第2層選單
                var list2 = all
                    .Where(a => a.UpId == r1.Id)
                    .OrderBy(a => a.Sort)
                    .ToList();
                foreach (var r2 in list2)
                {
                    //一定有第2層
                    var addMenu2 = false;
                    var menu2 = new MenuDto()
                    {
                        Id = r2.Id,
                        Name = r2.Name,
                        Url = r2.Url,
                        Sort = r2.Sort,
                        Icon = r2.Icon,
                    };

                    //第3層選單
                    var list3 = all
                        .Where(a => a.UpId == r2.Id)
                        .OrderBy(a => a.Sort)
                        .ToList();
                    //不一定有第3層
                    if (list3 == null || list3.Count == 0)
                    {
                        if (progs.Contains(r2.ProgId))
                            addMenu2 = true;
                    }
                    else
                    {
                        foreach (var r3 in list3)
                        {
                            if (string.IsNullOrEmpty(r3.ProgId) || !progs.Contains(r3.ProgId))
                                continue;

                            //加入第3層選單
                            addMenu2 = true;
                            menu2.Childs.Add(new MenuDto()
                            {
                                Id = r3.Id,
                                Name = r3.Name,
                                Url = r3.Url,
                                Sort = r3.Sort,
                                Icon = r3.Icon,
                            });

                        }//for 3
                    }

                    //加入第2層選單
                    if (addMenu2)
                    {
                        menu1.Childs.Add(menu2);
                        addMenu1 = true;
                    }
                }//for 2

                //加入第1層選單
                if (addMenu1)
                    data.Add(menu1);
            }//for 1

            return data;
        }
        */

    }//class
}
