﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CRUD_With_Ajax_Bootstrap.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class CompanyEntities : DbContext
    {
        public CompanyEntities()
            : base("name=CompanyEntities")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<NewEmployee> NewEmployees { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
    
        public virtual int delete_emp(Nullable<int> emp_id)
        {
            var emp_idParameter = emp_id.HasValue ?
                new ObjectParameter("emp_id", emp_id) :
                new ObjectParameter("emp_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("delete_emp", emp_idParameter);
        }
    
        public virtual ObjectResult<select_emp_Result> select_emp(Nullable<int> emp_id)
        {
            var emp_idParameter = emp_id.HasValue ?
                new ObjectParameter("emp_id", emp_id) :
                new ObjectParameter("emp_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<select_emp_Result>("select_emp", emp_idParameter);
        }
    }
}