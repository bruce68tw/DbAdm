using System;
using System.Collections.Generic;
using Base.Services;
using Microsoft.EntityFrameworkCore;

namespace DbAdm.Tables;

public partial class MyContext : DbContext
{
    public MyContext()
    {
    }

    public MyContext(DbContextOptions<MyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Column> Column { get; set; }

    public virtual DbSet<Crud> Crud { get; set; }

    public virtual DbSet<CrudEitem> CrudEitem { get; set; }

    public virtual DbSet<CrudEtable> CrudEtable { get; set; }

    public virtual DbSet<CrudQitem> CrudQitem { get; set; }

    public virtual DbSet<CrudRitem> CrudRitem { get; set; }

    public virtual DbSet<CrudUiItem> CrudUiItem { get; set; }

    public virtual DbSet<DataDict> DataDict { get; set; }

    public virtual DbSet<Issue> Issue { get; set; }

    public virtual DbSet<IssueFile> IssueFile { get; set; }

    public virtual DbSet<IssueRelat> IssueRelat { get; set; }

    public virtual DbSet<IssueWatch> IssueWatch { get; set; }

    public virtual DbSet<PrjProg> PrjProg { get; set; }

    public virtual DbSet<Project> Project { get; set; }

    public virtual DbSet<Reporter> Reporter { get; set; }

    public virtual DbSet<Survey> Survey { get; set; }

    public virtual DbSet<Table> Table { get; set; }

    public virtual DbSet<Ui> Ui { get; set; }

    public virtual DbSet<XpCode> XpCode { get; set; }

    public virtual DbSet<XpDept> XpDept { get; set; }

    public virtual DbSet<XpProg> XpProg { get; set; }

    public virtual DbSet<XpRole> XpRole { get; set; }

    public virtual DbSet<XpRoleProg> XpRoleProg { get; set; }

    public virtual DbSet<XpUser> XpUser { get; set; }

    public virtual DbSet<XpUserRole> XpUserRole { get; set; }

    public virtual DbSet<tmpColumn> tmpColumn { get; set; }

    public virtual DbSet<tmpColumnImport> tmpColumnImport { get; set; }

    public virtual DbSet<tmpTable> tmpTable { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(_Fun.Config.Db);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Column>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.DataType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DefaultValue)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Fid)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasComment("old: Code");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Note).HasMaxLength(255);
            entity.Property(e => e.TableId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Crud>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Crud_1");

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.AuthType).HasComment("權限種類, 0(無), 1(Ctrl), 2(Action)");
            entity.Property(e => e.Created).HasColumnType("datetime");
            entity.Property(e => e.Creator)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IsUi).HasComment("是否dragdrop UI");
            entity.Property(e => e.ProgCode)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.ProgName).HasMaxLength(30);
            entity.Property(e => e.ProjectId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.ReadSql)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Revised).HasColumnType("datetime");
            entity.Property(e => e.Reviser)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TableAs)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CrudEitem>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.CheckData)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CheckType)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.ColumnId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.DefaultValue)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.EtableId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.InputType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("");
            entity.Property(e => e.ItemData).HasMaxLength(50);
            entity.Property(e => e.LayoutCols)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.PlaceHolder)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.PosGroup)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.zz_EitemType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("改用 InputType");

            entity.HasOne(d => d.Etable).WithMany(p => p.CrudEitem)
                .HasForeignKey(d => d.EtableId)
                .HasConstraintName("FK_CrudEitem_CrudEtable");
        });

        modelBuilder.Entity<CrudEtable>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.AutoIdLen)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Col4)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.CrudId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.FkeyFid)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.OrderBy)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.PkeyFid)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TableId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CrudQitem>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.ColumnId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CrudId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.DataType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Fid)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.InputType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("");
            entity.Property(e => e.ItemData)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LayoutCols)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Op)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.PosGroup)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.TableAs)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.zz_QitemType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("改用 InputType");
        });

        modelBuilder.Entity<CrudRitem>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.CrudId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Fid)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasComment("old: ColumnCode");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.RitemType)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CrudUiItem>(entity =>
        {
            entity.HasKey(e => e.Sn).HasName("PK_UiItem");

            entity.Property(e => e.BoxId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("上層容器Id, 0表示最外層");
            entity.Property(e => e.CrudId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("Ui.Id");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Info)
                .HasMaxLength(255)
                .HasComment("Item json 字串");
            entity.Property(e => e.ItemType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("see XpCode.Type=UiItemType");
        });

        modelBuilder.Entity<DataDict>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Code)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.DataType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DefaultValue)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Note).HasMaxLength(255);
            entity.Property(e => e.TableType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("refer XpCode.Type='TableType'");
        });

        modelBuilder.Entity<Issue>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Created)
                .HasComment("建檔日期")
                .HasColumnType("datetime");
            entity.Property(e => e.Creator)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("建檔人員");
            entity.Property(e => e.FromMgr)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("交辦主管");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IssueType)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Note).HasMaxLength(1000);
            entity.Property(e => e.OwnerId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.ProgId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Revised)
                .HasComment("修改日期")
                .HasColumnType("datetime");
            entity.Property(e => e.Reviser)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("修改人員");
            entity.Property(e => e.RptDeptCode)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.RptDeptId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.RptType).HasMaxLength(30);
            entity.Property(e => e.RptUser).HasMaxLength(20);
            entity.Property(e => e.Title).HasMaxLength(255);
            entity.Property(e => e.WorkDate).HasColumnType("smalldatetime");
            entity.Property(e => e.zz_ProjectId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<IssueFile>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Created).HasColumnType("datetime");
            entity.Property(e => e.Creator)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.FileName).HasMaxLength(100);
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IssueId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<IssueRelat>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Created).HasColumnType("datetime");
            entity.Property(e => e.Creator)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IssueId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.SourceIssue)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<IssueWatch>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IssueId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.WatcherId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PrjProg>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Creator)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.ProjectId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Project_1");

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Code).HasMaxLength(30);
            entity.Property(e => e.ConnectStr)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Created)
                .HasComment("建檔日期")
                .HasColumnType("datetime");
            entity.Property(e => e.Creator)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("建檔人員");
            entity.Property(e => e.DbName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.ProjectPath)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Revised)
                .HasComment("修改日期")
                .HasColumnType("datetime");
            entity.Property(e => e.Reviser)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("修改人員");
        });

        modelBuilder.Entity<Reporter>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(20);
        });

        modelBuilder.Entity<Survey>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Created).HasColumnType("datetime");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("同Issue.Id");
            entity.Property(e => e.Q5).HasMaxLength(100);
            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Note).HasMaxLength(255);
            entity.Property(e => e.ProjectId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Ui>(entity =>
        {
            entity.HasKey(e => e.Sn);

            entity.Property(e => e.Created).HasColumnType("datetime");
            entity.Property(e => e.Creator)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Note).HasMaxLength(255);
            entity.Property(e => e.ProgCode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ProgName).HasMaxLength(30);
            entity.Property(e => e.ProjectId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<XpCode>(entity =>
        {
            entity.HasKey(e => new { e.Type, e.Value });

            entity.Property(e => e.Type)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Value)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Ext)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Note).HasMaxLength(255);
        });

        modelBuilder.Entity<XpDept>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Dept");

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MgrId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
        });

        modelBuilder.Entity<XpProg>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Code)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Icon)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.Sort).HasDefaultValue((short)9);
            entity.Property(e => e.Url)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<XpRole>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(30);
        });

        modelBuilder.Entity<XpRoleProg>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.ProgId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.RoleId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<XpUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_User");

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Account)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DeptId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.EmpNo)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasComment("員工編號");
            entity.Property(e => e.Name).HasMaxLength(20);
            entity.Property(e => e.PhotoFile).HasMaxLength(100);
            entity.Property(e => e.Pwd)
                .HasMaxLength(32)
                .IsUnicode(false);
        });

        modelBuilder.Entity<XpUserRole>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.RoleId)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<tmpColumn>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.DataType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DefaultValue)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Note).HasMaxLength(100);
            entity.Property(e => e.TableCode)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<tmpColumnImport>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.ColumnCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ColumnName).HasMaxLength(500);
            entity.Property(e => e.DbName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DefaultValue)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Note).HasMaxLength(500);
            entity.Property(e => e.TableCode)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<tmpTable>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("PK__tmpTable__A25C5AA6183AE814");

            entity.Property(e => e.Code)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Note).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
