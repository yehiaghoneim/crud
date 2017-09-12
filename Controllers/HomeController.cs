using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using CRUD_With_Ajax_Bootstrap.Models;

namespace CRUD_With_Ajax_Bootstrap.Controllers
{
    public class HomeController : Controller
    {
     private readonly CompanyEntities _companyEntities=new CompanyEntities();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            var allempaEmployees = _companyEntities.NewEmployees
                .Join(_companyEntities.Departments, a => a.Department, q => q.DepartmentID, (a, q) => new
                {
                    a,q
                }).Select(w=>new
                {
                    w.a.Employee_id,
                    w.a.Name,
                    w.a.Country,
                    w.q.DepartmentName,
                    w.a.age,
                    w.a.state,
                    w.a.Department
                        
                });
            var finalllist = allempaEmployees.ToList();
            return Json(finalllist, JsonRequestBehavior.AllowGet);
            }
        public JsonResult Add(NewEmployee emp)
        {
            _companyEntities.NewEmployees.Add(emp);
           int x= _companyEntities.SaveChanges();
            return Json(x, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getbyid(int id)
        {
            NewEmployee employee = _companyEntities.NewEmployees.ToList().Find(q => q.Employee_id == id);
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(NewEmployee emp)
        {
            var employee  = _companyEntities.Entry(emp).State = EntityState.Modified;
            _companyEntities.SaveChanges();
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            
          
            return Json(_companyEntities.delete_emp(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Selectalldepartment()
        {
            List<Department> allDepartments = _companyEntities.Departments.ToList();

            return Json(allDepartments, JsonRequestBehavior.AllowGet);
        }
    }
}
