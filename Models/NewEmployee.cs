//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class NewEmployee
    {
        public int Employee_id { get; set; }
        public string Name { get; set; }
        public Nullable<int> age { get; set; }
        public string state { get; set; }
        public string Country { get; set; }
        public Nullable<int> Department { get; set; }
    
        public virtual Department Department1 { get; set; }
    }
}
