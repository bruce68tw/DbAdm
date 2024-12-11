
/* ==================
 2022/8/28 add CrudEtable.AutoIdLen
 ==================*/
if col_length('dbo.CrudEtable','AutoIdLen') is null
begin
	alter table dbo.CrudEtable add AutoIdLen varchar(20) NULL;	
	execute sp_addextendedproperty 'MS_Description', N'自動Id欄位長度'
end
go

--add Project.Creator
if col_length('dbo.Project', 'Creator') is null
begin
	alter table dbo.Project add
		Creator varchar(10) null,
		Created datetime null,
		Reviser varchar(10) null,
		Revised datetime null;

	execute sp_addextendedproperty 'MS_Description', N'建檔人員', 'user', 'dbo', 'table', 'Project', 'column', 'Creator'
	execute sp_addextendedproperty 'MS_Description', N'建檔日期', 'user', 'dbo', 'table', 'Project', 'column', 'Created'
	execute sp_addextendedproperty 'MS_Description', N'修改人員', 'user', 'dbo', 'table', 'Project', 'column', 'Reviser'
	execute sp_addextendedproperty 'MS_Description', N'修改日期', 'user', 'dbo', 'table', 'Project', 'column', 'Revised'
end
GO

update dbo.Project set Creator='aa', Created=getDate() where Creator is null	
GO

--create XpUser table
if object_id('dbo.XpUser', 'U') is null
begin
	CREATE TABLE [dbo].[XpUser](
		[Id] [varchar](10) NOT NULL,
		[Account] [varchar](20) NOT NULL,
		[Name] [nvarchar](20) NOT NULL,
		[Pwd] [varchar](32) NOT NULL,
		[DeptId] [varchar](10) NOT NULL,
		[Status] [bit] NOT NULL,
	CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
	
	insert into dbo.[XpUser](Id,Account,Name,Pwd,DeptId,Status) values ('aa','aa','管理者','','IT',1)
end
GO

--create XpDept table
if object_id('dbo.XpDept', 'U') is null
begin
	CREATE TABLE [dbo].[XpDept](
		[Id] [varchar](10) NOT NULL,
		[Name] [nvarchar](30) NOT NULL,
		[MgrId] [varchar](10) NOT NULL,
	CONSTRAINT [PK_Dept] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
	
	insert into dbo.[XpDept](Id,Name,MgrId) values ('IT','資訊部','aa');
end
GO

--insert XpCode  
IF NOT EXISTS (SELECT 1 FROM dbo.XpCode WHERE [Type]='AuthRange')
BEGIN
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort) VALUES ('AuthRange', '0', N'無', 1)
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort) VALUES ('AuthRange', '1', N'個人', 2)
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort) VALUES ('AuthRange', '2', N'部門', 3)
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort) VALUES ('AuthRange', '3', N'全部', 4)
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.XpCode WHERE [Type]='IssueType')
BEGIN
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort,Note) VALUES ('IssueType', 'R', N'例行工作', 1, 'Routine')
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort,Note) VALUES ('IssueType', 'K', N'知識', 2, 'KM')
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort,Note) VALUES ('IssueType', 'M', N'會議', 3, 'Meeting')
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort,Note) VALUES ('IssueType', 'L', N'請假', 4, 'Leave')
	INSERT [dbo].[XpCode] ([Type],[Value],Name,Sort,Note) VALUES ('IssueType', 'O', N'其他', 5, 'Other')
END
GO

--create & insert XpProg table
if object_id('dbo.XpProg', 'U') is null
begin
	CREATE TABLE [dbo].[XpProg](
		[Id] [varchar](10) NOT NULL,
		[Code] [varchar](30) NOT NULL,
		[Name] [nvarchar](30) NOT NULL,
		[Icon] [varchar](20) NULL,
		[Url] [varchar](100) NULL,
		[Sort] [smallint] NOT NULL,
		[AuthRow] [tinyint] NOT NULL,
		[FunCreate] [tinyint] NOT NULL,
		[FunRead] [tinyint] NOT NULL,
		[FunUpdate] [tinyint] NOT NULL,
		[FunDelete] [tinyint] NOT NULL,
		[FunPrint] [tinyint] NOT NULL,
		[FunExport] [tinyint] NOT NULL,
		[FunView] [tinyint] NOT NULL,
		[FunOther] [tinyint] NOT NULL,
	 CONSTRAINT [PK_XpProg] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
	
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_Sort]  DEFAULT ((9)) FOR [Sort]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_AuthRow]  DEFAULT ((0)) FOR [AuthRow]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunCreate]  DEFAULT ((0)) FOR [FunCreate]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunRead]  DEFAULT ((0)) FOR [FunRead]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunUpdate]  DEFAULT ((0)) FOR [FunUpdate]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunDelete]  DEFAULT ((0)) FOR [FunDelete]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunPrint]  DEFAULT ((0)) FOR [FunPrint]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunExport]  DEFAULT ((0)) FOR [FunExport]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunView]  DEFAULT ((0)) FOR [FunView]
	ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunOther]  DEFAULT ((0)) FOR [FunOther]
	
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Column', N'Column', N'Column', NULL, N'/Column/Read', 3, 1, 1, 1, 1, 1, 0, 0, 1, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'MyCrud', N'MyCrud', N'MyCrud', NULL, N'/MyCrud/Read', 4, 1, 0, 1, 1, 0, 0, 0, 1, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Project', N'Project', N'Project', NULL, N'/Project/Read', 1, 1, 1, 1, 1, 1, 0, 0, 1, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'SetPwd', N'SetPwd', N'SetPwd', NULL, N'/SetPwd/Index', 5, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Table', N'Table', N'Table', NULL, N'/Table/Read', 2, 1, 1, 1, 1, 1, 0, 0, 1, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpUser', N'XpUser', N'XpUser', NULL, N'/XpUser/Read', 5, 0, 1, 1, 1, 1, 0, 0, 1, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpProg', N'XpProg', N'XpProg', NULL, N'/XpProg/Read', 7, 0, 1, 1, 1, 1, 0, 0, 1, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpRole', N'XpRole', N'XpRole', NULL, N'/XpRole/Read', 6, 0, 1, 1, 1, 1, 0, 0, 1, 0)
end
GO

--add other XpProg
IF NOT EXISTS (SELECT 1 FROM dbo.XpProg WHERE [Id]='PrjProg')
BEGIN
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'PrjProg', N'PrjProg', N'PrjProg', NULL, N'/PrjProg/Read', 9, 0, 1, 1, 1, 1, 0, 0, 1, 0)
	INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Issue', N'Issue', N'Issue', NULL, N'/Issue/Read', 10, 1, 0, 1, 1, 0, 0, 0, 1, 0)
END
GO

--create & insert XpRole table
if object_id('dbo.XpRole', 'U') is null
begin
	CREATE TABLE [dbo].[XpRole](
		[Id] [varchar](10) NOT NULL,
		[Name] [nvarchar](30) NOT NULL,
	 CONSTRAINT [PK_XpRole] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]

	INSERT [dbo].[XpRole] ([Id], [Name]) VALUES ('Adm', N'管理者')
end
GO

--create & insert XpUserRole table
if object_id('dbo.XpUserRole', 'U') is null
begin
	CREATE TABLE [dbo].[XpUserRole](
		[Id] [varchar](10) NOT NULL,
		[UserId] [varchar](10) NOT NULL,
		[RoleId] [varchar](10) NOT NULL,
	 CONSTRAINT [PK_XpUserRole] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]

	INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'001', N'aa', N'Adm')
end
GO

--create & insert XpRoleProg table
if object_id('dbo.XpRoleProg', 'U') is null
begin
	CREATE TABLE [dbo].[XpRoleProg](
		[Id] [varchar](10) NOT NULL,
		[RoleId] [varchar](10) NOT NULL,
		[ProgId] [varchar](10) NOT NULL,
		[FunCreate] [tinyint] NOT NULL,
		[FunRead] [tinyint] NOT NULL,
		[FunUpdate] [tinyint] NOT NULL,
		[FunDelete] [tinyint] NOT NULL,
		[FunPrint] [tinyint] NOT NULL,
		[FunExport] [tinyint] NOT NULL,
		[FunView] [tinyint] NOT NULL,
		[FunOther] [tinyint] NOT NULL,
	 CONSTRAINT [PK_XpRoleProg] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]

	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunCreate]  DEFAULT ((0)) FOR [FunCreate]
	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunRead]  DEFAULT ((0)) FOR [FunRead]
	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunUpdate]  DEFAULT ((0)) FOR [FunUpdate]
	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunDelete]  DEFAULT ((0)) FOR [FunDelete]
	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunPrint]  DEFAULT ((0)) FOR [FunPrint]
	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunExport]  DEFAULT ((0)) FOR [FunExport]
	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunView]  DEFAULT ((0)) FOR [FunView]
	ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunOther]  DEFAULT ((0)) FOR [FunOther]

	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'zNA1tEuwsA', N'Adm', N'Project', 1, 9, 9, 9, 0, 0, 9, 0)
	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'bgZ6GpMNDn', N'Adm', N'Table', 1, 9, 9, 9, 0, 0, 9, 0)
	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'ThvaGXxpZN', N'Adm', N'Column', 1, 9, 9, 9, 0, 0, 9, 0)
	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'twEbJKKcOi', N'Adm', N'MyCrud', 1, 9, 9, 9, 0, 0, 9, 0)
	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'q4jiuKviUm', N'Adm', N'SetPwd', 0, 0, 0, 0, 0, 0, 0, 0)
	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'7fA4Ba9RhU', N'Adm', N'User', 1, 0, 0, 0, 0, 0, 0, 0)
	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'z0fW8NzHUn', N'Adm', N'XpRole', 1, 0, 0, 0, 0, 0, 0, 0)
	INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'2koAJkBw89', N'Adm', N'XpProg', 1, 0, 0, 0, 0, 0, 0, 0)
end
GO

--create & PrjProg table
if object_id('dbo.PrjProg', 'U') is null
begin
	CREATE TABLE [dbo].[PrjProg](
		[Id] [varchar](10) NOT NULL,
		[Name] [nvarchar](30) NOT NULL,
		[ProjectId] [varchar](10) NOT NULL,
		[Sort] [smallint] NOT NULL,
		[Status] [bit] NOT NULL,
	 CONSTRAINT [PK_PrjProg] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]
	
	CREATE NONCLUSTERED INDEX [PrjProg_ProjectId] ON [dbo].[PrjProg]
	(
		[ProjectId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
end
GO

--create & Issue table
if object_id('dbo.Issue', 'U') is null
begin
	CREATE TABLE [dbo].[Issue](
		[Sn] [int] IDENTITY(1,1) NOT NULL,
		[Id] [varchar](10) NOT NULL,
		[ProjectId] [varchar](10) NOT NULL,
		[ProgId] [varchar](10) NOT NULL,
		[OwnerId] [varchar](10) NOT NULL,
		[Title] [nvarchar](255) NOT NULL,
		[IssueType] [char](1) NOT NULL,
		[Note] [nvarchar](1000) NULL,
		[Creator] [varchar](10) NOT NULL,
		[Created] [datetime] NOT NULL,
		[Reviser] [varchar](10) NULL,
		[Revised] [datetime] NULL,
	 CONSTRAINT [PK_Issue] PRIMARY KEY CLUSTERED 
	(
		[Sn] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	) ON [PRIMARY]

	CREATE UNIQUE NONCLUSTERED INDEX [Issue_Id] ON [dbo].[Issue]
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
	
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建檔人員' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Creator'
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建檔日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Created'
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改人員' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Reviser'
	EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Revised'
end
GO