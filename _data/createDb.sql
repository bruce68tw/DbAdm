/****** Object:  Table [dbo].[Column]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Column](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[TableId] [varchar](10) NOT NULL,
	[Code] [varchar](100) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[DataType] [varchar](20) NOT NULL,
	[Nullable] [bit] NOT NULL,
	[DefaultValue] [varchar](100) NULL,
	[Sort] [int] NOT NULL,
	[Note] [nvarchar](255) NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Column] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Crud]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Crud](
	[Id] [varchar](10) NOT NULL,
	[ProjectId] [varchar](10) NOT NULL,
	[ProgCode] [varchar](30) NOT NULL,
	[ProgName] [nvarchar](30) NOT NULL,
	[LabelHori] [bit] NOT NULL,
	[ReadSql] [varchar](500) NOT NULL,
	[TableAs] [varchar](10) NULL,
	[HasCreate] [bit] NOT NULL,
	[HasUpdate] [bit] NOT NULL,
	[HasDelete] [bit] NOT NULL,
	[HasView] [bit] NOT NULL,
	[HasExport] [bit] NOT NULL,
	[HasReset] [bit] NOT NULL,
	[AuthType] [tinyint] NOT NULL,
	[Status] [bit] NOT NULL,
	[Created] [datetime] NOT NULL,
	[Revised] [datetime] NULL,
 CONSTRAINT [PK_Crud_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudEitem]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudEitem](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[EtableId] [varchar](10) NOT NULL,
	[ColumnId] [varchar](10) NOT NULL,
	[EitemType] [varchar](10) NOT NULL,
	[ItemData] [nvarchar](50) NULL,
	[Required] [bit] NOT NULL,
	[HasCreate] [bit] NOT NULL,
	[HasUpdate] [bit] NOT NULL,
	[PlaceHolder] [varchar](10) NULL,
	[DefaultValue] [varchar](10) NULL,
	[PosGroup] [varchar](10) NULL,
	[LayoutCols] [varchar](10) NULL,
	[Width] [int] NOT NULL,
	[CheckType] [varchar](10) NOT NULL,
	[CheckData] [varchar](10) NULL,
	[Sort] [int] NOT NULL,
 CONSTRAINT [PK_CrudEitem] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudEtable]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudEtable](
	[Id] [varchar](10) NOT NULL,
	[CrudId] [varchar](10) NOT NULL,
	[TableId] [varchar](10) NOT NULL,
	[PkeyFid] [varchar](10) NOT NULL,
	[FkeyFid] [varchar](10) NULL,
	[Col4] [varchar](30) NOT NULL,
	[OrderBy] [varchar](10) NOT NULL,
	[Sort] [int] NOT NULL,
	[HalfWidth] [bit] NOT NULL,
	[AutoIdLen] [varchar](20) NULL,
 CONSTRAINT [PK_CrudEtable] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudQitem]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudQitem](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[CrudId] [varchar](10) NOT NULL,
	[ColumnId] [varchar](10) NOT NULL,
	[TableAs] [varchar](20) NOT NULL,
	[QitemType] [varchar](20) NOT NULL,
	[ItemData] [varchar](20) NULL,
	[Op] [varchar](10) NOT NULL,
	[IsRange] [bit] NOT NULL,
	[IsFind2] [bit] NOT NULL,
	[PosGroup] [varchar](10) NULL,
	[LayoutCols] [varchar](20) NULL,
	[Sort] [int] NOT NULL,
 CONSTRAINT [PK_CrudQitem] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudRitem]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudRitem](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[CrudId] [varchar](10) NOT NULL,
	[ColumnCode] [varchar](100) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Width] [int] NOT NULL,
	[RitemType] [varchar](10) NOT NULL,
	[Sort] [int] NOT NULL,
 CONSTRAINT [PK_CrudRitem] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Issue]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Issue](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[ProjectId] [varchar](10) NOT NULL,
	[ProgId] [varchar](10) NOT NULL,
	[OwnerId] [varchar](10) NULL,
	[IssueType] [varchar](5) NOT NULL,
	[WorkDate] [smalldatetime] NULL,
	[WorkHours] [smallint] NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Note] [nvarchar](1000) NULL,
	[IsFinish] [bit] NOT NULL,
	[RptDeptCode] [varchar](10) NULL,
	[RptDeptId] [varchar](10) NULL,
	[RptUser] [nvarchar](20) NULL,
	[RptType] [nvarchar](30) NULL,
	[Creator] [varchar](10) NOT NULL,
	[Created] [datetime] NOT NULL,
	[Reviser] [varchar](10) NULL,
	[Revised] [datetime] NULL,
 CONSTRAINT [PK_Issue] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IssueFile]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IssueFile](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[IssueId] [varchar](10) NOT NULL,
	[FileName] [nvarchar](100) NOT NULL,
	[Creator] [varchar](10) NOT NULL,
	[Created] [datetime] NOT NULL,
 CONSTRAINT [PK_IssueFile] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IssueRelat]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IssueRelat](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[IssueId] [varchar](10) NOT NULL,
	[SourceIssue] [varchar](10) NOT NULL,
	[Creator] [varchar](10) NOT NULL,
	[Created] [datetime] NOT NULL,
 CONSTRAINT [PK_IssueRelat] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IssueWatch]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IssueWatch](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[IssueId] [varchar](10) NOT NULL,
	[WatcherId] [varchar](10) NOT NULL,
 CONSTRAINT [PK_IssueWatch] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PrjProg]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PrjProg](
	[Id] [varchar](10) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[ProjectId] [varchar](10) NOT NULL,
	[Sort] [smallint] NOT NULL,
	[Status] [bit] NOT NULL,
	[Creator] [varchar](10) NOT NULL,
 CONSTRAINT [PK_PrjProg] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Id] [varchar](10) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[Code] [nvarchar](30) NOT NULL,
	[DbName] [varchar](20) NOT NULL,
	[DbType] [tinyint] NOT NULL,
	[ProjectPath] [varchar](255) NOT NULL,
	[ConnectStr] [varchar](255) NOT NULL,
	[Status] [bit] NOT NULL,
	[FromTmpTable] [bit] NOT NULL,
	[Creator] [varchar](10) NULL,
	[Created] [datetime] NULL,
	[Reviser] [varchar](10) NULL,
	[Revised] [datetime] NULL,
 CONSTRAINT [PK_Project_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Table]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[ProjectId] [varchar](10) NOT NULL,
	[Code] [varchar](100) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Note] [nvarchar](255) NULL,
	[TranLog] [bit] NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Table] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tmpColumn]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tmpColumn](
	[Code] [varchar](100) NOT NULL,
	[TableCode] [varchar](100) NULL,
	[DataType] [varchar](20) NOT NULL,
	[Nullable] [bit] NOT NULL,
	[DefaultValue] [varchar](100) NULL,
	[Sort] [smallint] NOT NULL,
	[Note] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tmpColumnImport]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tmpColumnImport](
	[DbName] [varchar](50) NULL,
	[TableCode] [varchar](50) NULL,
	[ColumnCode] [varchar](50) NULL,
	[ColumnName] [nvarchar](500) NULL,
	[DefaultValue] [varchar](50) NULL,
	[Note] [nvarchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tmpTable]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tmpTable](
	[Code] [varchar](100) NOT NULL,
	[Note] [nvarchar](255) NULL,
 CONSTRAINT [PK__tmpTable__A25C5AA6183AE814] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[XpCode]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XpCode](
	[Type] [varchar](20) NOT NULL,
	[Value] [varchar](10) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Sort] [int] NOT NULL,
	[Ext] [varchar](30) NULL,
	[Note] [nvarchar](255) NULL,
 CONSTRAINT [PK_XpCode] PRIMARY KEY CLUSTERED 
(
	[Type] ASC,
	[Value] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[XpDept]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XpDept](
	[Id] [varchar](10) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[MgrId] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Dept] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[XpProg]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
GO
/****** Object:  Table [dbo].[XpRole]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XpRole](
	[Id] [varchar](10) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_XpRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[XpRoleProg]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
GO
/****** Object:  Table [dbo].[XpUser]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XpUser](
	[Id] [varchar](10) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Account] [varchar](20) NOT NULL,
	[Pwd] [varchar](32) NOT NULL,
	[DeptId] [varchar](10) NOT NULL,
	[PhotoFile] [nvarchar](100) NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[XpUserRole]    Script Date: 2025/2/3 上午 09:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XpUserRole](
	[Id] [varchar](10) NOT NULL,
	[UserId] [varchar](10) NOT NULL,
	[RoleId] [varchar](10) NOT NULL,
 CONSTRAINT [PK_XpUserRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Column] ON 
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1, N'15ZQD4ED1A', N'D58LXL44TA', N'test', N'test', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (931, N'5X9RB37ZKA', N'5X9RB36MYA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (932, N'5X9RB381FA', N'5X9RB36MYA', N'TableId', N'資料表Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (933, N'5X9RB3845A', N'5X9RB36MYA', N'Name', N'欄位名稱', N'nvarchar(30)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (934, N'5X9RB3890A', N'5X9RB36MYA', N'DataType', N'資料型態', N'varchar(20)', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (935, N'5X9RB38APA', N'5X9RB36MYA', N'Nullable', N'可空值', N'bit', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (936, N'5X9RB38E9A', N'5X9RB36MYA', N'DefaultValue', N'預設值', N'varchar(100)', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (937, N'5X9RB38G3A', N'5X9RB36MYA', N'Sort', N'排序', N'int', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (938, N'5X9RB38HTA', N'5X9RB36MYA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (939, N'5X9RB38KTA', N'5X9RB36MYA', N'Status', N'資料狀態', N'bit', 0, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (940, N'5X9RB38NHA', N'5X9RB36PRA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (941, N'5X9RB38QJA', N'5X9RB36PRA', N'ProjectId', N'專案Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (942, N'5X9RB395WA', N'5X9RB36PRA', N'LabelHori', N'水平Label', N'bit', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (943, N'5X9RB397PA', N'5X9RB36PRA', N'ReadSql', N'查詢Sql', N'varchar(500)', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (944, N'5X9RB39DFA', N'5X9RB36PRA', N'TableAs', N'資料表別名', N'varchar(10)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (945, N'5X9RB39FLA', N'5X9RB36PRA', N'HasCreate', N'Create功能', N'bit', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (946, N'5X9RB39HDA', N'5X9RB36PRA', N'HasUpdate', N'Update功能', N'bit', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (947, N'5X9RB39L2A', N'5X9RB36PRA', N'HasDelete', N'Delete功能', N'bit', 0, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (948, N'5X9RB39NSA', N'5X9RB36PRA', N'HasView', N'View功能', N'bit', 0, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (949, N'5X9RB39QUA', N'5X9RB36PRA', N'HasExport', N'Export功能', N'bit', 0, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (950, N'5X9RB39TLA', N'5X9RB36PRA', N'HasReset', N'Reset功能', N'bit', 0, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (951, N'5X9RB39VJA', N'5X9RB36PRA', N'Status', N'資料狀態', N'bit', 0, N'', 15, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (952, N'5X9RB39XPA', N'5X9RB36TCA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (953, N'5X9RB3A19A', N'5X9RB36TCA', N'EtableId', N'EtableId', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (954, N'5X9RB3A4CA', N'5X9RB36TCA', N'InputType', N'輸入類型', N'varchar(10)', 0, N'', 4, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (955, N'5X9RB3A6GA', N'5X9RB36TCA', N'InputData', N'輸入資料', N'nvarchar(50)', 1, N'', 5, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (956, N'5X9RB3A9JA', N'5X9RB36TCA', N'Required', N'必填', N'bit', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (957, N'5X9RB3ABDA', N'5X9RB36TCA', N'HasCreate', N'Create功能', N'bit', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (958, N'5X9RB3ACRA', N'5X9RB36TCA', N'HasUpdate', N'Update功能', N'bit', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (959, N'5X9RB3AE4A', N'5X9RB36TCA', N'PlaceHolder', N'PlaceHolder', N'varchar(10)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (960, N'5X9RB3AHCA', N'5X9RB36TCA', N'DefaultValue', N'預設值', N'varchar(10)', 1, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (961, N'5X9RB3AT3A', N'5X9RB36TCA', N'PosGroup', N'同列', N'varchar(10)', 1, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (962, N'5X9RB3BH2A', N'5X9RB36TCA', N'LayoutCols', N'版位', N'varchar(10)', 1, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (963, N'5X9RB3DMHA', N'5X9RB36TCA', N'Width', N'欄位寬度', N'int', 0, N'', 14, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (964, N'5X9RB3E38A', N'5X9RB36TCA', N'CheckType', N'檢查類型', N'varchar(10)', 0, N'', 15, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (965, N'5X9RB3E4QA', N'5X9RB36TCA', N'CheckData', N'檢查資料', N'varchar(10)', 1, N'', 16, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (966, N'5X9RB3E6SA', N'5X9RB36TCA', N'Sort', N'排序', N'int', 0, N'', 17, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (967, N'5X9RB3E8JA', N'5X9RB36VLA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (968, N'5X9RB3EAAA', N'5X9RB36VLA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (969, N'5X9RB3EBUA', N'5X9RB36VLA', N'TableId', N'資料表Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (970, N'5X9RB3EDAA', N'5X9RB36VLA', N'Kid', N'主鍵Id', N'varchar(10)', 0, N'', 4, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (971, N'5X9RB3EEPA', N'5X9RB36VLA', N'MapFid', N'外鍵Id', N'varchar(10)', 1, N'', 5, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (972, N'5X9RB3EG4A', N'5X9RB36VLA', N'Col4', N'Col4', N'varchar(30)', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (973, N'5X9RB3EHJA', N'5X9RB36VLA', N'OrderBy', N'OrderBy', N'varchar(10)', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (974, N'5X9RB3EK8A', N'5X9RB36VLA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (975, N'5X9RB3ELQA', N'5X9RB36XEA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (976, N'5X9RB3ENRA', N'5X9RB36XEA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (977, N'5X9RB3F0AA', N'5X9RB36XEA', N'TableAs', N'資料表別名', N'varchar(20)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (978, N'5X9RB3FABA', N'5X9RB36XEA', N'InputType', N'輸入類型', N'varchar(20)', 0, N'', 5, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (979, N'5X9RB3FC9A', N'5X9RB36XEA', N'InputData', N'輸入資料', N'varchar(20)', 1, N'', 6, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (980, N'5X9RB3FELA', N'5X9RB36XEA', N'Op', N'比對方式', N'varchar(10)', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (981, N'5X9RB3FG9A', N'5X9RB36XEA', N'IsRange', N'Range比對', N'bit', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (982, N'5X9RB3FHUA', N'5X9RB36XEA', N'IsFind2', N'進階查詢', N'bit', 0, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (983, N'5X9RB3FKDA', N'5X9RB36XEA', N'PosGroup', N'同列', N'varchar(10)', 1, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (984, N'5X9RB3FM3A', N'5X9RB36XEA', N'LayoutCols', N'版位', N'varchar(20)', 1, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (985, N'5X9RB3FNUA', N'5X9RB36XEA', N'ExtInfo', N'其他資料', N'varchar(20)', 1, N'', 12, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (986, N'5X9RB3FQ1A', N'5X9RB36XEA', N'Sort', N'排序', N'int', 0, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (987, N'5X9RB3FRUA', N'5X9RB36ZCA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (988, N'5X9RB3FTJA', N'5X9RB36ZCA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (989, N'5X9RB3G21A', N'5X9RB36ZCA', N'Width', N'欄位寬度', N'int', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (990, N'5X9RB3G3PA', N'5X9RB36ZCA', N'RitemType', N'結果欄位類型', N'varchar(10)', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (991, N'5X9RB3G5KA', N'5X9RB36ZCA', N'ExtInfo', N'其他資料', N'varchar(30)', 1, N'', 7, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (992, N'5X9RB3G71A', N'5X9RB36ZCA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (993, N'5X9RB3G8EA', N'5X9RB3720A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (994, N'5X9RB3GG2A', N'5X9RB3720A', N'DbName', N'Db名稱', N'varchar(20)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (995, N'5X9RB3GK9A', N'5X9RB3720A', N'ProjectPath', N'專案路徑', N'varchar(255)', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (996, N'5X9RB3GLJA', N'5X9RB3720A', N'ConnectStr', N'Db連線字串', N'varchar(255)', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (997, N'5X9RB3GN2A', N'5X9RB3720A', N'Status', N'資料狀態', N'bit', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (998, N'5X9RB3GPHA', N'5X9RB373ZA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (999, N'5X9RB3GRZA', N'5X9RB373ZA', N'ProjectId', N'專案Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1000, N'5X9RB3GT3A', N'5X9RB373ZA', N'Name', N'資料表名稱', N'nvarchar(30)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1001, N'5X9RB3GWNA', N'5X9RB373ZA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1002, N'5X9RB3GZ3A', N'5X9RB373ZA', N'Status', N'資料狀態', N'bit', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1003, N'5XBA43L8QA', N'5X9RB36TCA', N'ColumnId', N'欄位Id', N'varchar(10)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1004, N'5XBA43LBNA', N'5X9RB36XEA', N'ColumnId', N'欄位Id', N'varchar(10)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1005, N'5XD29XCRAA', N'5XD29XBSMA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1006, N'5XD29XCUNA', N'5XD29XBSMA', N'Name', N'部門名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1007, N'5XD29XCW1A', N'5XD29XBSMA', N'MgrId', N'主管Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1008, N'5XD29XD5LA', N'5XD29XC3BA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1009, N'5XD29XD72A', N'5XD29XC3BA', N'Account', N'帳號', N'varchar(20)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1010, N'5XD29XD8JA', N'5XD29XC3BA', N'Name', N'使用者名稱', N'nvarchar(20)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1011, N'5XD29XDARA', N'5XD29XC3BA', N'DeptId', N'部門', N'varchar(10)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1012, N'5XD29XDBYA', N'5XD29XC3BA', N'Status', N'資料狀態', N'bit', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1013, N'5XD29XDDDA', N'5XD29XC6LA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1014, N'5XD29XDF1A', N'5XD29XC6LA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1015, N'5XD29XDGTA', N'5XD29XC6LA', N'JobName', N'工作名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1016, N'5XD29XDKZA', N'5XD29XC6LA', N'JobType', N'工作類型', N'nvarchar(30)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1017, N'5XD29XDN0A', N'5XD29XC6LA', N'JobPlace', N'工作地點', N'nvarchar(30)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1018, N'5XD29XDPVA', N'5XD29XC6LA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1019, N'5XD29XDUAA', N'5XD29XC6LA', N'CorpName', N'公司名稱', N'nvarchar(30)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1020, N'5XD29XDVWA', N'5XD29XC6LA', N'CorpUsers', N'公司人數', N'int', 0, N'0', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1021, N'5XD29XDXPA', N'5XD29XC6LA', N'IsManaged', N'管理職', N'bit', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1022, N'5XD29XE1AA', N'5XD29XC6LA', N'JobDesc', N'工作說明', N'varchar(-1)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1023, N'5XD29XE2UA', N'5XD29XC7WA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1024, N'5XD29XE9LA', N'5XD29XC7WA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1025, N'5XD29XFPMA', N'5XD29XC7WA', N'LangName', N'語言名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1026, N'5XD29XFX1A', N'5XD29XC7WA', N'ListenLevel', N'聴力', N'tinyint', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1027, N'5XD29XFZXA', N'5XD29XC7WA', N'SpeakLevel', N'說', N'tinyint', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1028, N'5XD29XG6HA', N'5XD29XC7WA', N'ReadLevel', N'閱讀', N'tinyint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1029, N'5XD29XG8HA', N'5XD29XC7WA', N'WriteLevel', N'書寫', N'tinyint', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1030, N'5XD29XGACA', N'5XD29XC7WA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1031, N'5XD29XGC3A', N'5XD29XC9AA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1032, N'5XD29XGE9A', N'5XD29XC9AA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1033, N'5XD29XGG3A', N'5XD29XC9AA', N'LicenseName', N'證照名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1034, N'5XD29XGHSA', N'5XD29XC9AA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1035, N'5XD29XGKPA', N'5XD29XC9AA', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1036, N'5XD29XGNVA', N'5XD29XCAWA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1037, N'5XD29XGR4A', N'5XD29XCAWA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1038, N'5XD29XGSRA', N'5XD29XCAWA', N'SchoolName', N'學校名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1039, N'5XD29XGV8A', N'5XD29XCAWA', N'SchoolDept', N'科系', N'nvarchar(20)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1040, N'5XD29XGWUA', N'5XD29XCAWA', N'SchoolType', N'學歷種類', N'nvarchar(20)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1041, N'5XD29XGZGA', N'5XD29XCAWA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1042, N'5XD29XH1CA', N'5XD29XCAWA', N'Graduated', N'是否畢業', N'bit', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1043, N'5XD29XH4HA', N'5XD29XCDPA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1044, N'5XD29XH6EA', N'5XD29XCDPA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1045, N'5XD29XH8EA', N'5XD29XCDPA', N'SkillName', N'技能名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1046, N'5XD29XHA2A', N'5XD29XCDPA', N'SkillDesc', N'技能說明', N'nvarchar(500)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1047, N'5XLQ99LTVA', N'5XD29XC9AA', N'Sort', N'排序', N'int', 0, N'', 6, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1048, N'5XLQ99LV9A', N'5XD29XCDPA', N'Sort', N'排序', N'int', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1049, N'5YFVGEZSJA', N'5XD29XC3BA', N'Pwd', N'密碼', N'varchar(32)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1050, N'5YFVJXBYXA', N'5X9RB36MYA', N'Code', N'欄位代碼', N'varchar(100)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1051, N'5YFVJXC0WA', N'5X9RB36PRA', N'ProgCode', N'功能代碼', N'varchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1052, N'5YFVJXC2BA', N'5X9RB36PRA', N'ProgName', N'功能名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1053, N'5YFVJXC3RA', N'5X9RB36PRA', N'AuthType', N'權限種類', N'tinyint', 0, N'', 14, N'see Code, 0(無), 1(Ctrl), 2(Action)', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1054, N'5YFVJXC4ZA', N'5X9RB36PRA', N'Created', N'建檔時間', N'datetime', 0, N'', 16, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1055, N'5YFVJXC6KA', N'5X9RB36PRA', N'Revised', N'修改時間', N'datetime', 1, N'', 17, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1056, N'5YFVJXC7TA', N'5X9RB36ZCA', N'ColumnCode', N'欄位代碼', N'varchar(100)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1057, N'5YFVJXC9YA', N'5X9RB36ZCA', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1058, N'5YFVJXCB7A', N'5X9RB3720A', N'Code', N'專案代碼', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1059, N'5YFVJXCCVA', N'5X9RB373ZA', N'Code', N'資料表代碼', N'varchar(100)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1060, N'5Z5BHXMCMA', N'5Z5BHXK86A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1061, N'5Z5BHXME5A', N'5Z5BHXK86A', N'UserId', N'請假人', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1062, N'5Z5BHXMFJA', N'5Z5BHXK86A', N'AgentId', N'代理人', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1063, N'5Z5BHXMGLA', N'5Z5BHXK86A', N'LeaveType', N'假別', N'char(1)', 0, N'', 4, N'Code LeaveType', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1064, N'5Z5BHXMJ7A', N'5Z5BHXK86A', N'StartTime', N'開始時間', N'datetime', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1065, N'5Z5BHXMKSA', N'5Z5BHXK86A', N'EndTime', N'結束時間', N'datetime', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1066, N'5Z5BHXMM5A', N'5Z5BHXK86A', N'Hours', N'請假時數', N'decimal', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1067, N'5Z5BHXMS5A', N'5Z5BHXK86A', N'FlowSignStatus', N'流程簽核狀態', N'char(1)', 0, N'', 9, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1068, N'5Z5BHXMU0A', N'5Z5BHXK86A', N'Status', N'資料狀態', N'bit', 0, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1069, N'5Z5BHXMVTA', N'5Z5BHXK86A', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1070, N'5Z5BHXMXVA', N'5Z5BHXK86A', N'Created', N'建檔日期', N'datetime', 0, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1071, N'5Z5BHXMZRA', N'5Z5BHXK86A', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 14, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1072, N'5Z5BHXN1KA', N'5Z5BHXK86A', N'Revised', N'修改日期', N'datetime', 1, N'', 15, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1073, N'5ZKB7A6VPA', N'5X9RB36VLA', N'HalfWidth', N'是否半幅寬度', N'bit', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1074, N'D58FUTP10A', N'5X9RB36TCA', N'EitemType', N'編輯欄位種類', N'varchar(10)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1075, N'D58FUTPHMA', N'5X9RB36TCA', N'ItemData', N'欄位資料', N'nvarchar(50)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1076, N'D58FUTPZ6A', N'5X9RB36VLA', N'PkeyFid', N'主鍵欄位Id', N'varchar(10)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1077, N'D58FUTQEQA', N'5X9RB36VLA', N'FkeyFid', N'外鍵欄位Id', N'varchar(10)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1078, N'D58FUTQVNA', N'5X9RB36XEA', N'QitemType', N'查詢欄位種類', N'varchar(20)', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1079, N'D58FUTRAMA', N'5X9RB36XEA', N'ItemData', N'欄位資料', N'varchar(20)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1080, N'D58FUTT5TA', N'5X9RB373ZA', N'TranLog', N'是否記錄交易', N'bit', 0, N'0', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1081, N'D58FV79WAA', N'5Z5BHXK86A', N'FlowLevel', N'流程目前Level', N'tinyint', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1082, N'D58FV7ABUA', N'5Z5BHXK86A', N'FlowStatus', N'流程狀態', N'char(1)', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1083, N'D58FV7ATEA', N'5Z5BHXK86A', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1084, N'D58FV7B84A', N'5XD29XC3BA', N'PhotoFile', N'相片檔名', N'nvarchar(100)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1085, N'D58J2RNGAA', N'D58J2RM39A', N'Type', N'資料類別', N'varchar(20)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1086, N'D58J2RNXYA', N'D58J2RM39A', N'Value', N'Key值', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1087, N'D58J2RPC0A', N'D58J2RM39A', N'Name', N'顯示內容', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1088, N'D58J2RPTKA', N'D58J2RM39A', N'Sort', N'排序', N'int', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1089, N'D58J2RQ9CA', N'D58J2RM39A', N'Ext', N'擴充資訊', N'varchar(30)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1090, N'D58J2RR6RA', N'D58J2RM39A', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1091, N'D58LXL78TA', N'D58LXKZJUA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1092, N'D58LXL7PHA', N'D58LXKZJUA', N'CmsType', N'Cms類別', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1093, N'D58LXL84GA', N'D58LXKZJUA', N'DataType', N'資料型態', N'varchar(10)', 1, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1094, N'D58LXL8LJA', N'D58LXKZJUA', N'Title', N'標題', N'nvarchar(255)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1095, N'D58LXL926A', N'D58LXKZJUA', N'Text', N'文字內容', N'nvarchar(-1)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1096, N'D58LXL9JRA', N'D58LXKZJUA', N'Html', N'HTML內容', N'nvarchar(-1)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1097, N'D58LXL9ZYA', N'D58LXKZJUA', N'Note', N'備註', N'nvarchar(255)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1098, N'D58LXLAE4A', N'D58LXKZJUA', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1099, N'D58LXLAWDA', N'D58LXKZJUA', N'StartTime', N'開始時間', N'datetime', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1100, N'D58LXLBBRA', N'D58LXKZJUA', N'EndTime', N'結束時間', N'datetime', 0, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1101, N'D58LXLBS3A', N'D58LXKZJUA', N'Status', N'資料狀態', N'bit', 0, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1102, N'D58LXLC7BA', N'D58LXKZJUA', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1103, N'D58LXLCNPA', N'D58LXKZJUA', N'Created', N'建檔日期', N'datetime', 0, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1104, N'D58LXLD4AA', N'D58LXKZJUA', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 14, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1105, N'D58LXLDKHA', N'D58LXKZJUA', N'Revised', N'修改日期', N'datetime', 1, N'', 15, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1106, N'D58LXLE05A', N'D58LXL00BA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1107, N'D58LXLEGNA', N'D58LXL00BA', N'FldText', N'文字欄位', N'nchar(10)', 1, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1108, N'D58LXLEXFA', N'D58LXL00BA', N'FldNum', N'整數欄位', N'int', 1, N'', 3, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1109, N'D58LXLFDXA', N'D58LXL00BA', N'FldNum2', N'小數欄位', N'float', 1, N'', 4, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1110, N'D58LXLFVLA', N'D58LXL00BA', N'FldCheck', N'Check欄位', N'bit', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1111, N'D58LXLGATA', N'D58LXL00BA', N'FldRadio', N'Radio欄位', N'tinyint', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1112, N'D58LXLGR2A', N'D58LXL00BA', N'FldSelect', N'下拉式欄位', N'varchar(10)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1113, N'D58LXLH7YA', N'D58LXL00BA', N'FldDate', N'日期欄位', N'date', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1114, N'D58LXLHNJA', N'D58LXL00BA', N'FldDatetime', N'時間欄位', N'datetime', 1, N'', 9, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1115, N'D58LXLJ38A', N'D58LXL00BA', N'FldFile', N'檔案欄位', N'nvarchar(100)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1116, N'D58LXLJJKA', N'D58LXL00BA', N'FldColor', N'Color欄位', N'varchar(10)', 1, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1117, N'D58LXLJZDA', N'D58LXL00BA', N'FldTextarea', N'多行文字欄位', N'nvarchar(-1)', 1, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1118, N'D58LXLKFWA', N'D58LXL00BA', N'FldHtml', N'HTML欄位', N'nvarchar(-1)', 1, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1119, N'D58LXLKXXA', N'D58LXL0GHA', N'Type', N'資料類別', N'varchar(20)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1120, N'D58LXLLC9A', N'D58LXL0GHA', N'Value', N'Key值', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1121, N'D58LXLLTNA', N'D58LXL0GHA', N'Name_zhTW', N'名稱(繁中)', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1122, N'D58LXLM8FA', N'D58LXL0GHA', N'Name_zhCN', N'名稱(簡中)', N'nvarchar(30)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1123, N'D58LXLMQTA', N'D58LXL0GHA', N'Name_enUS', N'名稱(英文)', N'nvarchar(30)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1124, N'D58LXLN5BA', N'D58LXL0GHA', N'Sort', N'排序', N'int', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1125, N'D58LXLNLEA', N'D58LXL0GHA', N'Ext', N'擴充資訊', N'varchar(30)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1126, N'D58LXLP29A', N'D58LXL0GHA', N'Note', N'備註', N'nvarchar(255)', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1127, N'D58LXLPJHA', N'D58LXL0Y0A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1128, N'D58LXLPZMA', N'D58LXL0Y0A', N'Name', N'名稱', N'nvarchar(50)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1129, N'D58LXLQF2A', N'D58LXL0Y0A', N'TplFile', N'範本檔名', N'nvarchar(100)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1130, N'D58LXLQWKA', N'D58LXL0Y0A', N'ToEmails', N'收件者', N'varchar(500)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1131, N'D58LXLRCUA', N'D58LXL0Y0A', N'Sql', N'SQL內容', N'nvarchar(500)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1132, N'D58LXLRT0A', N'D58LXL0Y0A', N'Status', N'資料狀態', N'bit', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1133, N'D58LXLS80A', N'D58LXL1D4A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1134, N'D58LXLSQUA', N'D58LXL1D4A', N'Code', N'代碼', N'varchar(20)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1135, N'D58LXLT5GA', N'D58LXL1D4A', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1136, N'D58LXLTMCA', N'D58LXL1D4A', N'Portrait', N'是否直立', N'bit', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1137, N'D58LXLU24A', N'D58LXL1D4A', N'Status', N'資料狀態', N'bit', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1138, N'D58LXLUH6A', N'D58LXL1VTA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1139, N'D58LXLUY9A', N'D58LXL1VTA', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1140, N'D58LXLVE4A', N'D58LXL1VTA', N'StartNode', N'開始節點', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1141, N'D58LXLVVGA', N'D58LXL1VTA', N'EndNode', N'結束節點', N'varchar(10)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1142, N'D58LXLWA6A', N'D58LXL1VTA', N'CondStr', N'條件字串', N'varchar(255)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1143, N'D58LXLWR6A', N'D58LXL1VTA', N'Sort', N'排序', N'smallint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1144, N'D58LXLX7DA', N'D58LXL2A8A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1145, N'D58LXLXPBA', N'D58LXL2A8A', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1146, N'D58LXLY5WA', N'D58LXL2A8A', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1147, N'D58LXLYM9A', N'D58LXL2A8A', N'NodeType', N'節點類別', N'char(1)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1148, N'D58LXLZ2TA', N'D58LXL2A8A', N'PosX', N'位置X', N'smallint', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1149, N'D58LXLZHUA', N'D58LXL2A8A', N'PosY', N'位置Y', N'smallint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1150, N'D58LXLZZFA', N'D58LXL2A8A', N'SignerType', N'簽核者類別', N'varchar(2)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1151, N'D58LXM0F2A', N'D58LXL2A8A', N'SignerValue', N'簽核者值', N'varchar(30)', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1152, N'D58LXM0XDA', N'D58LXL2A8A', N'PassType', N'通過類別', N'char(1)', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1153, N'D58LXM1D6A', N'D58LXL2A8A', N'PassNum', N'通過數量', N'smallint', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1154, N'D58LXM1UJA', N'D58LXL2SLA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1155, N'D58LXM2ADA', N'D58LXL2SLA', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1156, N'D58LXM2SWA', N'D58LXL2SLA', N'SourceId', N'來源資料Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1157, N'D58LXM374A', N'D58LXL2SLA', N'NodeName', N'節點名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1158, N'D58LXM3PDA', N'D58LXL2SLA', N'FlowLevel', N'流程Level', N'smallint', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1159, N'D58LXM44MA', N'D58LXL2SLA', N'TotalLevel', N'合計Level', N'smallint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1160, N'D58LXM4STA', N'D58LXL2SLA', N'SignerId', N'簽核者Id', N'varchar(10)', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1161, N'D58LXM51YA', N'D58LXL2SLA', N'SignerName', N'簽核者姓名', N'nvarchar(20)', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1162, N'D58LXM5GQA', N'D58LXL2SLA', N'SignStatus', N'簽核狀態', N'char(1)', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1163, N'D58LXM5YEA', N'D58LXL2SLA', N'SignTime', N'簽核時間', N'datetime', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1164, N'D58LXM6DAA', N'D58LXL2SLA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1165, N'D58LXM6UQA', N'D58LXL378A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1166, N'D58LXM7ABA', N'D58LXL378A', N'Type', N'資料類別', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1167, N'D58LXM7R3A', N'D58LXL378A', N'FileName', N'上傳檔名', N'nvarchar(100)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1168, N'D58LXM861A', N'D58LXL378A', N'OkCount', N'成功筆數', N'smallint', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1169, N'D58LXM8MUA', N'D58LXL378A', N'FailCount', N'失敗筆數', N'smallint', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1170, N'D58LXM93BA', N'D58LXL378A', N'TotalCount', N'合計筆數', N'smallint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1171, N'D58LXM9J1A', N'D58LXL378A', N'CreatorName', N'建檔人員', N'nvarchar(30)', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1172, N'D58LXM9ZEA', N'D58LXL378A', N'Created', N'建檔日期', N'datetime', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1173, N'D58LXMAE9A', N'D58LXL3N4A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1174, N'D58LXMAWMA', N'D58LXL3N4A', N'Code', N'代碼', N'varchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1175, N'D58LXMBB0A', N'D58LXL3N4A', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1176, N'D58LXMBSCA', N'D58LXL3N4A', N'Icon', N'圖示', N'varchar(20)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1177, N'D58LXMC85A', N'D58LXL3N4A', N'Url', N'Url', N'varchar(100)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1178, N'D58LXMCQ7A', N'D58LXL3N4A', N'Sort', N'排序', N'smallint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1179, N'D58LXMD5AA', N'D58LXL3N4A', N'AuthRow', N'資料權限', N'tinyint', 0, N'0', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1180, N'D58LXMDL8A', N'D58LXL3N4A', N'FunCreate', N'FunCreate', N'tinyint', 0, N'0', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1181, N'D58LXME1HA', N'D58LXL3N4A', N'FunRead', N'FunRead', N'tinyint', 0, N'0', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1182, N'D58LXMEGYA', N'D58LXL3N4A', N'FunUpdate', N'FunUpdate', N'tinyint', 0, N'0', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1183, N'D58LXMEX3A', N'D58LXL3N4A', N'FunDelete', N'FunDelete', N'tinyint', 0, N'0', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1184, N'D58LXMFD9A', N'D58LXL3N4A', N'FunPrint', N'FunPrint', N'tinyint', 0, N'0', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1185, N'D58LXMFVYA', N'D58LXL3N4A', N'FunExport', N'FunExport', N'tinyint', 0, N'0', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1186, N'D58LXMGAPA', N'D58LXL3N4A', N'FunView', N'FunView', N'tinyint', 0, N'0', 14, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1187, N'D58LXMGRPA', N'D58LXL3N4A', N'FunOther', N'FunOther', N'tinyint', 0, N'0', 15, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1188, N'D58LXMH73A', N'D58LXL44TA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1189, N'D58LXMHPPA', N'D58LXL44TA', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1190, N'D58LXMJ4NA', N'D58LXL4KKA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1191, N'D58LXMJKJA', N'D58LXL4KKA', N'RoleId', N'角色Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1192, N'D58LXMK1QA', N'D58LXL4KKA', N'ProgId', N'功能Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1193, N'D58LXMKHDA', N'D58LXL4KKA', N'FunCreate', N'FunCreate', N'tinyint', 0, N'0', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1194, N'D58LXMKYWA', N'D58LXL4KKA', N'FunRead', N'FunRead', N'tinyint', 0, N'0', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1195, N'D58LXMLD7A', N'D58LXL4KKA', N'FunUpdate', N'FunUpdate', N'tinyint', 0, N'0', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1196, N'D58LXMLUYA', N'D58LXL4KKA', N'FunDelete', N'FunDelete', N'tinyint', 0, N'0', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1197, N'D58LXMMAHA', N'D58LXL4KKA', N'FunPrint', N'FunPrint', N'tinyint', 0, N'0', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1198, N'D58LXMMSRA', N'D58LXL4KKA', N'FunExport', N'FunExport', N'tinyint', 0, N'0', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1199, N'D58LXMN8NA', N'D58LXL4KKA', N'FunView', N'FunView', N'tinyint', 0, N'0', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1200, N'D58LXMNPHA', N'D58LXL4KKA', N'FunOther', N'FunOther', N'tinyint', 0, N'0', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1201, N'D58LXMP45A', N'D58LXL50NA', N'Sn', N'序號', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1202, N'D58LXMPLVA', N'D58LXL50NA', N'RowId', N'資料Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1203, N'D58LXMQ1QA', N'D58LXL50NA', N'TableName', N'資料表名稱', N'varchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1204, N'D58LXMQG0A', N'D58LXL50NA', N'ColName', N'欄位名稱', N'varchar(30)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1205, N'D58LXMQYKA', N'D58LXL50NA', N'OldValue', N'舊值', N'nvarchar(500)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1206, N'D58LXMRE7A', N'D58LXL50NA', N'NewValue', N'新值', N'nvarchar(500)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1207, N'D58LXMRVJA', N'D58LXL50NA', N'Act', N'執行動作', N'varchar(10)', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1208, N'D58LXMSB0A', N'D58LXL50NA', N'Created', N'建檔日期', N'datetime', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1209, N'D58LXMSSCA', N'D58LXL5FUA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1210, N'D58LXMT79A', N'D58LXL5FUA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1211, N'D58LXMTNNA', N'D58LXL5FUA', N'RoleId', N'角色Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1212, N'D58WX65UJA', N'D58WX60WVA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 1, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1213, N'D58WX66AAA', N'D58WX60WVA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1214, N'D58WX66RHA', N'D58WX60WVA', N'Created', N'建檔日期', N'datetime', 0, N'', 3, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1215, N'D58WX677AA', N'D58WX61CCA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1216, N'D58WX67N5A', N'D58WX61CCA', N'Name', N'尋寶名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1217, N'D58WX683EA', N'D58WX61CCA', N'StartTime', N'開始時間', N'datetime', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1218, N'D58WX68JCA', N'D58WX61CCA', N'EndTime', N'結束時間', N'datetime', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1219, N'D58WX68ZGA', N'D58WX61CCA', N'IsBatch', N'是否批次解謎', N'bit', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1220, N'D58WX69E7A', N'D58WX61CCA', N'IsMove', N'是否移動地點', N'bit', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1221, N'D58WX6ABUA', N'D58WX61CCA', N'GiftName', N'獎品內容', N'nvarchar(100)', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1222, N'D58WX6ATUA', N'D58WX61CCA', N'Note', N'注意事項', N'nvarchar(500)', 1, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1223, N'D58WX6C6SA', N'D58WX61CCA', N'LaunchStatus', N'上架狀態', N'char(1)', 0, N'''0''', 11, N'refer XpCode.LaunchStatus', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1224, N'D58WX6CNVA', N'D58WX61CCA', N'Status', N'資料狀態', N'bit', 0, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1225, N'D58WX6D3LA', N'D58WX61CCA', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1226, N'D58WX6E0GA', N'D58WX61TFA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1227, N'D58WX6EFQA', N'D58WX61TFA', N'CmsType', N'CMS種類', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1228, N'D58WX6EWHA', N'D58WX61TFA', N'Title', N'標題', N'nvarchar(255)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1229, N'D58WX6FC1A', N'D58WX61TFA', N'Text', N'文字內容', N'nvarchar(-1)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1230, N'D58WX6FT1A', N'D58WX61TFA', N'Html', N'Html內容', N'nvarchar(-1)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1231, N'D58WX6G8UA', N'D58WX61TFA', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1232, N'D58WX6GPJA', N'D58WX61TFA', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1233, N'D58WX6H4WA', N'D58WX61TFA', N'StartTime', N'開始時間', N'datetime', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1234, N'D58WX6HL3A', N'D58WX61TFA', N'EndTime', N'結束時間', N'datetime', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1235, N'D58WX6J13A', N'D58WX61TFA', N'Status', N'資料狀態', N'bit', 0, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1236, N'D58WX6JHKA', N'D58WX61TFA', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1237, N'D58WX6JZ4A', N'D58WX61TFA', N'Created', N'建檔日期', N'datetime', 0, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1238, N'D58WX6KEGA', N'D58WX61TFA', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1239, N'D58WX6KVNA', N'D58WX61TFA', N'Revised', N'修改日期', N'datetime', 1, N'', 14, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1240, N'D58WX6LB5A', N'D58WX627KA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1241, N'D58WX6LSHA', N'D58WX627KA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1242, N'D58WX6M70A', N'D58WX627KA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 3, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1243, N'D58WX6MNHA', N'D58WX627KA', N'Reply', N'答題內容', N'nvarchar(500)', 0, N'', 4, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1244, N'D58WX6N48A', N'D58WX627KA', N'Created', N'建檔日期', N'datetime', 0, N'', 5, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1245, N'D58WX6NKEA', N'D58WX62PGA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1246, N'D58WX6P1NA', N'D58WX62PGA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1247, N'D58WX6PHDA', N'D58WX62PGA', N'FileName', N'上傳檔案名稱', N'nvarchar(100)', 0, N'', 3, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1248, N'D58WX6PZDA', N'D58WX62PGA', N'Hint', N'提示', N'nvarchar(100)', 1, N'', 4, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1249, N'D58WX6QEEA', N'D58WX62PGA', N'Answer', N'正確答案', N'varchar(22)', 0, N'', 5, N'MD5加密', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1250, N'D58WX6QWGA', N'D58WX62PGA', N'Sort', N'排序', N'smallint', 0, N'', 6, N'', 0)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1251, N'D58WX6RBPA', N'D58WX634WA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1252, N'D58WX6RT8A', N'D58WX634WA', N'Name', N'姓名', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1253, N'D58WX6S9UA', N'D58WX634WA', N'Account', N'帳號', N'varchar(20)', 0, N'', 3, N'可修改', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1254, N'D58WX6SRJA', N'D58WX634WA', N'Pwd', N'密碼', N'varchar(22)', 0, N'''''', 4, N'MD5加密', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1255, N'D58WX6T64A', N'D58WX634WA', N'Status', N'資料狀態', N'bit', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1256, N'D58WX6TMNA', N'D58WX634WA', N'IsAdmin', N'是否管理者', N'bit', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1257, N'D58WX6U3JA', N'D58WX63L5A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1258, N'D58WX6UKQA', N'D58WX63L5A', N'Name', N'姓名', N'nvarchar(30)', 1, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1259, N'D58WX6V0WA', N'D58WX63L5A', N'Phone', N'手機號碼', N'varchar(15)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1260, N'D58WX6VFNA', N'D58WX63L5A', N'Email', N'Email', N'varchar(100)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1261, N'D58WX6VXLA', N'D58WX63L5A', N'Address', N'地址', N'nvarchar(255)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1262, N'D58WX6WCUA', N'D58WX63L5A', N'Created', N'建檔日期', N'datetime', 0, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1263, N'D58WX6WUUA', N'D58WX63L5A', N'Revised', N'修改日期', N'datetime', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1264, N'D58WX6XA1A', N'D58WX6485A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1265, N'D58WX6XRPA', N'D58WX6485A', N'Name', N'姓名', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1266, N'D58WX6Y7NA', N'D58WX6485A', N'Account', N'帳號', N'varchar(30)', 0, N'', 3, N'可修改', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1267, N'D58WX6YNSA', N'D58WX6485A', N'Pwd', N'密碼', N'varchar(22)', 0, N'''''', 4, N'MD5加密', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1268, N'D58WX6Z41A', N'D58WX6485A', N'Phone', N'手機號碼', N'varchar(15)', 0, N'', 5, N'不可修改', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1269, N'D58WX6ZKCA', N'D58WX6485A', N'Email', N'Email', N'varchar(100)', 0, N'', 6, N'不可修改', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1270, N'D58WX70B0A', N'D58WX6485A', N'Address', N'地址', N'nvarchar(255)', 0, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1271, N'D58WX70X9A', N'D58WX6485A', N'IsCorp', N'是否公司', N'bit', 0, N'', 8, N'公司才能設定Bao.IsMove=true', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1272, N'D58WX71C0A', N'D58WX6485A', N'Created', N'建檔日期', N'datetime', 0, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1273, N'D70XCQLA3A', N'D58LXL00BA', N'FldInt', N'', N'int', 1, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1274, N'D70XCQLSCA', N'D58LXL00BA', N'FldDec', N'', N'float', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1275, N'D70XCQM7TA', N'D58LXL00BA', N'FldDt', N'', N'datetime', 1, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1276, N'D8ZRXEVPDA', N'D58WX61CCA', N'StageCount', N'關卡數目', N'tinyint', 0, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1277, N'D8ZRXEW46A', N'D58WX61CCA', N'Revised', N'異動日期', N'datetime', 0, N'', 14, N'含建檔日期', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1278, N'D8ZRXEWK8A', N'D8ZRXETU8A', N'UserId', N'App用戶Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1279, N'D8ZRXEX1RA', N'D8ZRXETU8A', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1280, N'D8ZRXEXHBA', N'D8ZRXETU8A', N'AttendStatus', N'參加狀態', N'char(1)', 0, N'', 3, N'refer XpCode AttendStatus', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1281, N'D8ZRXEXY2A', N'D8ZRXETU8A', N'Created', N'建檔日期', N'datetime', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1282, N'D8ZRXEYE4A', N'D8ZRXEUAEA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1283, N'D8ZRXEYVPA', N'D8ZRXEUAEA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1284, N'D8ZRXEZB3A', N'D8ZRXEUAEA', N'UserId', N'App用戶Id', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1285, N'D8ZRXEZTXA', N'D8ZRXEUAEA', N'Reply', N'答題內容', N'nvarchar(500)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1286, N'D8ZRXF08SA', N'D8ZRXEUAEA', N'Created', N'建檔日期', N'datetime', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1287, N'D8ZRXF0Q4A', N'D8ZRXEUS7A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1288, N'D8ZRXF163A', N'D8ZRXEUS7A', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1289, N'D8ZRXF1LKA', N'D8ZRXEUS7A', N'FileName', N'上傳檔案名稱', N'nvarchar(100)', 0, N'', 3, N'關卡圖檔', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1290, N'D8ZRXF21QA', N'D8ZRXEUS7A', N'AppHint', N'App用戶提示', N'nvarchar(100)', 1, N'', 4, N'顯示在App', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1291, N'D8ZRXF2GXA', N'D8ZRXEUS7A', N'CustHint', N'客戶提示', N'nvarchar(100)', 1, N'', 5, N'for 客戶維護用途', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1292, N'D8ZRXF2YXA', N'D8ZRXEUS7A', N'Answer', N'正確答案', N'varchar(22)', 0, N'', 6, N'MD5加密', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1293, N'D8ZRXF3D4A', N'D8ZRXEUS7A', N'Sort', N'排序', N'smallint', 0, N'', 7, N'base 0', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1294, N'D8ZRXF3V7A', N'D58WX63L5A', N'Status', N'資料狀態', N'bit', 0, N'0', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1295, N'D8ZRXF4ARA', N'D58WX6485A', N'Status', N'資料狀態', N'bit', 0, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1296, N'D9QS7Q771A', N'D58WX61CCA', N'IsMoney', N'是否獎金', N'bit', 0, N'', 7, N'0(獎品), 1(獎金)', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1297, N'D9QS7Q7NDA', N'D8ZRXETU8A', N'NowLevel', N'目前關卡', N'smallint', 0, N'1', 4, N'base 1', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1298, N'D9QS7Q84SA', N'D58WX63L5A', N'AuthCode', N'認證號碼', N'varchar(10)', 1, N'', 6, N'App用戶建立帳號或是回復帳號時, 必須經過認證', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1299, N'D9QTSQG2QA', N'D9QTSQF55A', N'Type', N'資料類別', N'varchar(20)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1300, N'D9QTSQGHUA', N'D9QTSQF55A', N'Value', N'Key值', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1301, N'D9QTSQGYWA', N'D9QTSQF55A', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1302, N'D9QTSQHD9A', N'D9QTSQF55A', N'Sort', N'排序', N'int', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1303, N'D9QTSQHVPA', N'D9QTSQF55A', N'Ext', N'擴充資訊', N'varchar(30)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1304, N'D9QTSQJAGA', N'D9QTSQF55A', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10783, N'HyCqhKLbUj', N'5X9RB36MYA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10784, N'9AR644Rz1S', N'5X9RB36TCA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10785, N'xlwhgmLoCe', N'5X9RB36VLA', N'AutoIdLen', N'', N'varchar(20)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10786, N'IOQCjWJb0Z', N'5X9RB36XEA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10787, N'QzwcThaFgg', N'5X9RB36ZCA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10788, N'gSsqhBBNL1', N'oOG6kwUBcT', N'Sn', N'', N'nchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10789, N'lrxkoVuL9N', N'oOG6kwUBcT', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10790, N'qH3wMFow2l', N'oOG6kwUBcT', N'ProgId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10791, N'toPiQ9D3zx', N'oOG6kwUBcT', N'OwnerId', N'', N'varchar(10)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10792, N'08XKCcU7cs', N'oOG6kwUBcT', N'Title', N'', N'nvarchar(255)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10793, N'GgRiWW7KxW', N'oOG6kwUBcT', N'IssueType', N'', N'char(1)', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10794, N'e4y7hfjkGv', N'oOG6kwUBcT', N'Note', N'', N'nvarchar(1000)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10795, N'T8nJiW3G0b', N'oOG6kwUBcT', N'Creator', N'', N'varchar(10)', 0, N'', 8, N'建檔人員', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10796, N'exN2k1hrQS', N'oOG6kwUBcT', N'Created', N'', N'datetime', 0, N'', 9, N'建檔日期', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10797, N'oKTK9qHW1J', N'oOG6kwUBcT', N'Reviser', N'', N'varchar(10)', 1, N'', 10, N'修改人員', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10798, N'O6vOCd8tj5', N'oOG6kwUBcT', N'Revised', N'', N'datetime', 1, N'', 11, N'修改日期', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10799, N'3bxDGkBCZY', N'iskfQCWWld', N'm22_systype', N'', N'char(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10800, N'rlrYaj45J6', N'iskfQCWWld', N'm22_versions', N'', N'char(4)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10801, N'JvoosGki6V', N'iskfQCWWld', N'm22_table', N'', N'varchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10802, N'Avm9fYMkxF', N'iskfQCWWld', N'm22_colid', N'', N'varchar(3)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10803, N'MZs4jm52yf', N'iskfQCWWld', N'm22_column', N'', N'varchar(30)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10804, N'g1HOgnBpzx', N'iskfQCWWld', N'm22_typestat', N'', N'decimal', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10805, N'ejRjKRBNLI', N'iskfQCWWld', N'm22_length', N'', N'decimal', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10806, N'sGokeTlxNW', N'iskfQCWWld', N'm22_scale', N'', N'decimal', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10807, N'oUc1GEbhuU', N'iskfQCWWld', N'm22_isnullable', N'', N'char(1)', 1, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10808, N'fwMY0Nhlag', N'iskfQCWWld', N'm22_colname', N'', N'varchar(255)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10809, N'AbIrdDLuLB', N'iskfQCWWld', N'm22_meno', N'', N'varchar(255)', 1, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10810, N'f4wptDg1eb', N'iskfQCWWld', N'm22_pkey', N'', N'decimal', 1, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10811, N'D7J66mIkm9', N'iskfQCWWld', N'm22_indexkey1', N'', N'decimal', 1, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10812, N'Ku7YSfNE0n', N'iskfQCWWld', N'm22_indexkey2', N'', N'decimal', 1, N'', 14, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10813, N'NSh8Ss9F5i', N'iskfQCWWld', N'm22_indexkey3', N'', N'decimal', 1, N'', 15, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10814, N'Ot6xBDxoBf', N'iskfQCWWld', N'm22_indexkey4', N'', N'decimal', 1, N'', 16, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10815, N'AsQAuiPxDs', N'iskfQCWWld', N'm22_indexkey5', N'', N'decimal', 1, N'', 17, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10816, N'BN6r4Pb9PC', N'iskfQCWWld', N'm22_indexkey6', N'', N'decimal', 1, N'', 18, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10817, N'9EX7Xx1Nqi', N'iskfQCWWld', N'm22_indexkey7', N'', N'decimal', 1, N'', 19, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10818, N'NphSJrbbuR', N'iskfQCWWld', N'm22_indexkey8', N'', N'decimal', 1, N'', 20, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10819, N'LRxUV3Qwd3', N'iskfQCWWld', N'm22_indexkey9', N'', N'decimal', 1, N'', 21, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10820, N'BiwhJa33e0', N'iskfQCWWld', N'm22_upduserno', N'', N'varchar(8)', 1, N'', 22, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10821, N'KjrlED2QLf', N'iskfQCWWld', N'm22_upddatetime', N'', N'varchar(14)', 1, N'', 23, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10822, N'eJKuTG8uOY', N'AHODXbOs21', N'm21_systype', N'', N'char(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10823, N'o1DWJJNKmG', N'AHODXbOs21', N'm21_versions', N'', N'char(4)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10824, N'2SOHKjAZBM', N'AHODXbOs21', N'm21_table', N'', N'varchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10825, N'Y2StCUcz9r', N'AHODXbOs21', N'm21_tablename', N'', N'varchar(100)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10826, N'gvKEQFKS5e', N'AHODXbOs21', N'm21_columnnum', N'', N'decimal', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10827, N'rAyi3KjD39', N'AHODXbOs21', N'm21_dbversions', N'', N'char(4)', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10828, N'oVNM6Ziwqt', N'AHODXbOs21', N'm21_meno', N'', N'varchar(200)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10829, N'cuhC71YBtK', N'AHODXbOs21', N'm21_tablealias', N'', N'varchar(5)', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10830, N'ZutK44lksH', N'AHODXbOs21', N'm21_pflag', N'', N'char(1)', 1, N'', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10831, N'1GTOgjPE1n', N'AHODXbOs21', N'm21_upduserno', N'', N'varchar(8)', 1, N'', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10832, N'sZfyTOyWkV', N'AHODXbOs21', N'm21_upddatetime', N'', N'varchar(14)', 1, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10833, N'Kbwcf8gZM0', N'AHODXbOs21', N'm21_filegroup', N'', N'char(1)', 1, N'', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10834, N'QKG8Dfcmxv', N'5X9RB3720A', N'DbType', N'', N'tinyint', 0, N'0', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10835, N'uM8PSQnwmR', N'5X9RB3720A', N'FromTmpTable', N'', N'bit', 0, N'0', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10836, N'lIRnWZcuyI', N'5X9RB3720A', N'Creator', N'', N'varchar(10)', 1, N'', 10, N'建檔人員', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10837, N'GH2txWoKm6', N'5X9RB3720A', N'Created', N'', N'datetime', 1, N'', 11, N'建檔日期', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10838, N'vze34BzNyw', N'5X9RB3720A', N'Reviser', N'', N'varchar(10)', 1, N'', 12, N'修改人員', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10839, N'HGcoSy3FdW', N'5X9RB3720A', N'Revised', N'', N'datetime', 1, N'', 13, N'修改日期', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10840, N'n8NvDUKgVT', N'5X9RB373ZA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10841, N'8D6tWswj5e', N'GP5KoCoFVL', N'Code', N'', N'varchar(100)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10842, N'J4svJ3fZlT', N'GP5KoCoFVL', N'TableCode', N'', N'varchar(100)', 1, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10843, N'KoUzYTR1lp', N'GP5KoCoFVL', N'DataType', N'', N'varchar(20)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10844, N'G8s9MBFpYi', N'GP5KoCoFVL', N'Nullable', N'', N'bit', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10845, N'XWzO6tJPia', N'GP5KoCoFVL', N'DefaultValue', N'', N'varchar(100)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10846, N'Ce8kwQEOMO', N'GP5KoCoFVL', N'Sort', N'', N'smallint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10847, N'v54MuHrODL', N'GP5KoCoFVL', N'Note', N'', N'nvarchar(100)', 1, N'', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10848, N'4V1GWztYUv', N'6QsXKBAf4h', N'Code', N'', N'varchar(100)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10849, N'p6Cwls4mtd', N'6QsXKBAf4h', N'Note', N'', N'nvarchar(255)', 1, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10850, N'aHaXg9X3Ux', N'bnZnlLytAh', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10851, N'C8g5CUaxe7', N'bnZnlLytAh', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10852, N'GsM5X5adXE', N'bnZnlLytAh', N'MgrId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10853, N'8Gw3dMor04', N'6hxO6mna5B', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10854, N'xEIxDrli5J', N'6hxO6mna5B', N'Code', N'', N'varchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10855, N'uOKadavWpB', N'6hxO6mna5B', N'Name', N'', N'nvarchar(30)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10856, N'iRRKbpJcQv', N'6hxO6mna5B', N'Icon', N'', N'varchar(20)', 1, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10857, N'vlNHBneoiB', N'6hxO6mna5B', N'Url', N'', N'varchar(100)', 1, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10858, N'g3lZK8uuHt', N'6hxO6mna5B', N'Sort', N'', N'smallint', 0, N'9', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10859, N'fVlRZvOXIQ', N'6hxO6mna5B', N'AuthRow', N'', N'tinyint', 0, N'0', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10860, N'Ig7VX8m3KE', N'6hxO6mna5B', N'FunCreate', N'', N'tinyint', 0, N'0', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10861, N'xdspdF3Oe3', N'6hxO6mna5B', N'FunRead', N'', N'tinyint', 0, N'0', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10862, N'lP8afLkoQH', N'6hxO6mna5B', N'FunUpdate', N'', N'tinyint', 0, N'0', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10863, N'MUuYU3usp1', N'6hxO6mna5B', N'FunDelete', N'', N'tinyint', 0, N'0', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10864, N'dOSqPc0UVi', N'6hxO6mna5B', N'FunPrint', N'', N'tinyint', 0, N'0', 12, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10865, N'Jkux9AtINc', N'6hxO6mna5B', N'FunExport', N'', N'tinyint', 0, N'0', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10866, N'1MNMFh8mnb', N'6hxO6mna5B', N'FunView', N'', N'tinyint', 0, N'0', 14, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10867, N'7241lG9UDV', N'6hxO6mna5B', N'FunOther', N'', N'tinyint', 0, N'0', 15, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10868, N'4Q0wH0vWXQ', N'Shc53pKlhR', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10869, N'Cs65YLD9wj', N'Shc53pKlhR', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10870, N'iJ7os8NlSY', N'RGGtEcyABd', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10871, N'KPpWPw4PKG', N'RGGtEcyABd', N'RoleId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10872, N'xEEthhSVn9', N'RGGtEcyABd', N'ProgId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10873, N'AOj6ekGnsp', N'RGGtEcyABd', N'FunCreate', N'', N'tinyint', 0, N'0', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10874, N'vkwS6lHeQL', N'RGGtEcyABd', N'FunRead', N'', N'tinyint', 0, N'0', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10875, N'L6FTnNuI7L', N'RGGtEcyABd', N'FunUpdate', N'', N'tinyint', 0, N'0', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10876, N'Q5RWHg5yaq', N'RGGtEcyABd', N'FunDelete', N'', N'tinyint', 0, N'0', 7, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10877, N'KFHPTGolU3', N'RGGtEcyABd', N'FunPrint', N'', N'tinyint', 0, N'0', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10878, N'IRn6QsvpCr', N'RGGtEcyABd', N'FunExport', N'', N'tinyint', 0, N'0', 9, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10879, N'ZSmB0GA0zs', N'RGGtEcyABd', N'FunView', N'', N'tinyint', 0, N'0', 10, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10880, N'8IKS2nwuNB', N'RGGtEcyABd', N'FunOther', N'', N'tinyint', 0, N'0', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10881, N'TxjRo2r9SD', N'N28UZ1M3aY', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10882, N'xunplxahua', N'N28UZ1M3aY', N'Name', N'', N'nvarchar(20)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10883, N'wIDSJpGldh', N'N28UZ1M3aY', N'Account', N'', N'varchar(20)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10884, N'Lp3WkaapwF', N'N28UZ1M3aY', N'Pwd', N'', N'varchar(32)', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10885, N'nwLMlxSauQ', N'N28UZ1M3aY', N'DeptId', N'', N'varchar(10)', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10886, N'vnfPmns73t', N'N28UZ1M3aY', N'Status', N'', N'bit', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10887, N'CtN9mVn1WJ', N'e6HaNyL2vi', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10888, N'Ompxjv7SzW', N'e6HaNyL2vi', N'UserId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10889, N'R8UbVjrbbI', N'e6HaNyL2vi', N'RoleId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10890, N'HMDffuFGit', N'3DgSQnx0Wz', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10891, N'OcKm24vGQc', N'3DgSQnx0Wz', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10892, N'1Qe0r0bz7X', N'3DgSQnx0Wz', N'ProjectId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10893, N'9prI7l2STu', N'3DgSQnx0Wz', N'Sort', N'', N'smallint', 0, N'', 4, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10894, N'TYMsC4v2p9', N'3DgSQnx0Wz', N'Status', N'', N'bit', 0, N'', 5, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10895, N'ujlGI3q6n0', N'5X9RB3720A', N'Name', N'', N'nvarchar(20)', 0, N'', 2, N'', 1)
GO
SET IDENTITY_INSERT [dbo].[Column] OFF
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'2638sRu1lL', N'Db', N'Issue', N'問題維護', 1, N'select *
from dbo.Issue
ordre by Id', N'', 1, 1, 1, 1, 1, 1, 2, 1, CAST(N'2024-12-10T17:40:14.000' AS DateTime), CAST(N'2024-12-10T17:43:02.000' AS DateTime))
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5XDCQU13AA', N'Hr', N'UserExt', N'用戶學經歷維護', 1, N'select u.*, d.name as DeptName from [User] u
join [Dept] d on u.DeptId=d.Id
order by u.Id', N'', 0, 1, 0, 1, 0, 1, 1, 1, CAST(N'2020-12-12T19:18:07.000' AS DateTime), CAST(N'2021-01-20T18:09:39.000' AS DateTime))
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5Z5JPZR5HA', N'Hr', N'Leave', N'請假作業', 1, N'select l.* 
from Leave l
join [User] u on l.UserId=u.Id
join [User] u2 on l.AgentId=u2.Id
order by l.Id', N'', 1, 1, 1, 1, 0, 1, 1, 1, CAST(N'2021-02-18T01:11:15.000' AS DateTime), CAST(N'2021-02-20T11:53:27.000' AS DateTime))
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'D8J9A1MFLA', N'Db', N'Test', N'資料表維護2', 1, N'select 
    p.Code as ProjectCode, p.DbName,
    a.Code, a.Name, a.TranLog,
    '''' as _Fun, a.Status, 
    a.Id
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by a.Id desc', N'a', 1, 1, 1, 1, 0, 0, 0, 1, CAST(N'2022-01-20T11:10:47.000' AS DateTime), CAST(N'2022-01-20T15:25:28.000' AS DateTime))
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'D8JNSZN7YA', N'Db', N'Table2', N'資料表維護2', 1, N'select 
    p.Code as ProjectCode, p.DbName,
    a.Code, a.Name, a.TranLog,
    '''' as _Fun, a.Status, 
    a.Id
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by a.Id desc', N'', 1, 1, 1, 1, 0, 0, 0, 1, CAST(N'2022-01-20T16:11:25.000' AS DateTime), CAST(N'2022-05-06T00:18:24.000' AS DateTime))
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'RgOxvoVpND', N'Db', N'PrjProg', N'專案功能', 1, N'select * 
from dbo.PrjProg
order by Id', N'', 1, 1, 1, 1, 0, 0, 1, 1, CAST(N'2024-12-11T11:31:52.000' AS DateTime), NULL)
GO
SET IDENTITY_INSERT [dbo].[CrudEitem] ON 
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (11, N'5XEYLM3KAA', N'5XEYLM3AWA', N'5XD29XD5LA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (12, N'5XEYLM3N0A', N'5XEYLM3AWA', N'5XD29XD72A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (13, N'5XEYNLFSBA', N'5XEYLM3AWA', N'5XD29XD8JA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (14, N'5XEYNLFW4A', N'5XEYLM3AWA', N'5XD29XDARA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (15, N'5XEYNLFXLA', N'5XEYLM3AWA', N'5XD29XDBYA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (16, N'5XEYNLFYVA', N'5XEYNLFBNA', N'5XD29XDDDA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (17, N'5XEYNLG0EA', N'5XEYNLFBNA', N'5XD29XDF1A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (18, N'5XEYNLG1MA', N'5XEYNLFBNA', N'5XD29XDGTA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (19, N'5XEYNLG31A', N'5XEYNLFBNA', N'5XD29XDKZA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (20, N'5XEYNLG4KA', N'5XEYNLFBNA', N'5XD29XDN0A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (21, N'5XEYNLG5VA', N'5XEYNLFBNA', N'5XD29XDPVA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (22, N'5XEYNLG7CA', N'5XEYNLFBNA', N'5XD29XDUAA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (23, N'5XEYNLG8MA', N'5XEYNLFBNA', N'5XD29XDVWA', N'INT', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (24, N'5XEYNLGA4A', N'5XEYNLFBNA', N'5XD29XDXPA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (25, N'5XEYNLGBGA', N'5XEYNLFBNA', N'5XD29XE1AA', N'MO', N'1000', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (26, N'5XEYURNH5A', N'5XEYURMVMA', N'5XD29XGNVA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (27, N'5XEYURNJEA', N'5XEYURMVMA', N'5XD29XGR4A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (28, N'5XEYURNKSA', N'5XEYURMVMA', N'5XD29XGSRA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (29, N'5XEYURNN1A', N'5XEYURMVMA', N'5XD29XGV8A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (30, N'5XEYURNQBA', N'5XEYURMVMA', N'5XD29XGWUA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (31, N'5XEYURNRRA', N'5XEYURMVMA', N'5XD29XGZGA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (32, N'5XEYURNSWA', N'5XEYURMVMA', N'5XD29XH1CA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (33, N'5XEYURNX4A', N'5XEYURN5GA', N'5XD29XE2UA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (34, N'5XEYURNZNA', N'5XEYURN5GA', N'5XD29XE9LA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (35, N'5XEYURP18A', N'5XEYURN5GA', N'5XD29XGACA', N'SO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (36, N'5XEYURP33A', N'5XEYURN5GA', N'5XD29XFPMA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (37, N'5XEYURP56A', N'5XEYURN5GA', N'5XD29XFX1A', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (38, N'5XEYURP6HA', N'5XEYURN5GA', N'5XD29XFZXA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (39, N'5XEYURP80A', N'5XEYURN5GA', N'5XD29XG6HA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (40, N'5XEYURP9NA', N'5XEYURN5GA', N'5XD29XG8HA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (41, N'5XEYURPBDA', N'5XEYURNAJA', N'5XD29XGC3A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (42, N'5XEYURPDTA', N'5XEYURNAJA', N'5XD29XGE9A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (43, N'5XEYURPFAA', N'5XEYURNAJA', N'5XD29XGG3A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (44, N'5XEYURPGVA', N'5XEYURNAJA', N'5XD29XGHSA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (45, N'5XEYURPN5A', N'5XEYURNAJA', N'5XD29XGKPA', N'F', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (46, N'5XEYURPPJA', N'5XEYURNC2A', N'5XD29XH4HA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (47, N'5XEYURPQVA', N'5XEYURNC2A', N'5XD29XH6EA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (48, N'5XEYURPT8A', N'5XEYURNC2A', N'5XD29XHC2A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (49, N'5XEYURPWGA', N'5XEYURNC2A', N'5XD29XH8EA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (50, N'5XEYURPYZA', N'5XEYURNC2A', N'5XD29XHA2A', N'TA', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (51, N'5XLQA0CC6A', N'5XEYURNC2A', N'5XLQ99LV9A', N'SO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (52, N'5Z642A9Q8A', N'5Z642A9LLA', N'5Z5BHXMCMA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (53, N'5Z642A9QYA', N'5Z642A9LLA', N'5Z5BHXME5A', N'S', N'Users', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (54, N'5Z642A9RUA', N'5Z642A9LLA', N'5Z5BHXMFJA', N'S', N'Users', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (55, N'5Z642A9T0A', N'5Z642A9LLA', N'5Z5BHXMGLA', N'S', N'LeaveTypes', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (56, N'5Z642A9TYA', N'5Z642A9LLA', N'5Z5BHXMJ7A', N'DT', N'', 1, 1, 1, N'', N'', N'', N'2,4', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (57, N'5Z642A9ULA', N'5Z642A9LLA', N'5Z5BHXMKSA', N'DT', N'', 1, 1, 1, N'', N'', N'', N'2,4', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (58, N'5Z642A9VKA', N'5Z642A9LLA', N'5Z5BHXMM5A', N'DEC', N'', 1, 1, 1, N'', N'', N'', N'2,1', 0, N'0', N'', 6)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (59, N'5Z642A9XHA', N'5Z642A9LLA', N'5Z5BHXMS5A', N'RO', N'FlowSignStatusName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (60, N'5Z642A9YGA', N'5Z642A9LLA', N'5Z5BHXMU0A', N'C', N'啟用', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (61, N'5Z642A9ZHA', N'5Z642A9LLA', N'5Z5BHXMVTA', N'RO', N'CreatorName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (62, N'5Z642AA1FA', N'5Z642A9LLA', N'5Z5BHXMXVA', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 10)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (63, N'5Z642AA2HA', N'5Z642A9LLA', N'5Z5BHXMZRA', N'RO', N'ReviserName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 11)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (64, N'5Z642AA37A', N'5Z642A9LLA', N'5Z5BHXN1KA', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 12)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (65, N'D8J9A1TH3A', N'D8J9A1SKGA', N'5X9RB3GPHA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (66, N'D8J9A1TZHA', N'D8J9A1SKGA', N'5X9RB3GRZA', N'S', N'Projects', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (67, N'D8J9A1ULAA', N'D8J9A1SKGA', N'5YFVJXCCVA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (68, N'D8J9A1UXFA', N'D8J9A1SKGA', N'5X9RB3GT3A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (69, N'D8J9A1VD2A', N'D8J9A1SKGA', N'D58FUTT5TA', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (70, N'D8J9A1VVNA', N'D8J9A1SKGA', N'5X9RB3GZ3A', N'C', N'啟用', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (71, N'D8J9A1WAHA', N'D8J9A1T1AA', N'5X9RB37ZKA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (72, N'D8J9A1WRSA', N'D8J9A1T1AA', N'5X9RB381FA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (73, N'D8J9A1X7LA', N'D8J9A1T1AA', N'5YFVJXBYXA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (74, N'D8J9A1XP4A', N'D8J9A1T1AA', N'5X9RB3845A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (75, N'D8J9A1Y4LA', N'D8J9A1T1AA', N'5X9RB3890A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (76, N'D8J9A1YL9A', N'D8J9A1T1AA', N'5X9RB38APA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (77, N'D8J9A1Z1FA', N'D8J9A1T1AA', N'5X9RB38E9A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (78, N'D8J9A1ZHGA', N'D8J9A1T1AA', N'5X9RB38G3A', N'INT', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (79, N'D8J9A1ZZCA', N'D8J9A1T1AA', N'5X9RB38HTA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (80, N'D8J9A20FPA', N'D8J9A1T1AA', N'5X9RB38KTA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (81, N'D8JNSZTP0A', N'D8JNSZSWHA', N'5X9RB3GPHA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (82, N'D8JNSZU55A', N'D8JNSZSWHA', N'5X9RB3GRZA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (83, N'D8JNSZUNGA', N'D8JNSZSWHA', N'5YFVJXCCVA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (84, N'D8JNSZV2FA', N'D8JNSZSWHA', N'5X9RB3GT3A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (85, N'D8JNSZVJXA', N'D8JNSZSWHA', N'D58FUTT5TA', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (86, N'D8JNSZW0MA', N'D8JNSZSWHA', N'5X9RB3GZ3A', N'C', N'正常', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (87, N'D8JNSZWECA', N'D8JNSZT7JA', N'5X9RB37ZKA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (88, N'D8JNSZWXHA', N'D8JNSZT7JA', N'5X9RB381FA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (89, N'D8JNSZXAKA', N'D8JNSZT7JA', N'5YFVJXBYXA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (90, N'D8JNSZXS2A', N'D8JNSZT7JA', N'5X9RB3845A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (91, N'D8JNSZY7TA', N'D8JNSZT7JA', N'5X9RB3890A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (92, N'D8JNSZYP2A', N'D8JNSZT7JA', N'5X9RB38APA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (93, N'D8JNSZZ72A', N'D8JNSZT7JA', N'5X9RB38E9A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (94, N'D8JNSZZNVA', N'D8JNSZT7JA', N'5X9RB38G3A', N'INT', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (95, N'D8JNT002PA', N'D8JNSZT7JA', N'5X9RB38HTA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (96, N'D8JNT00JHA', N'D8JNSZT7JA', N'5X9RB38KTA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3105, N'x2cdkvRX5g', N'lWoB2wEvK1', N'lrxkoVuL9N', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3106, N'ot62i29tal', N'lWoB2wEvK1', N'qH3wMFow2l', N'S', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3107, N'ZhXMgI1Lts', N'lWoB2wEvK1', N'toPiQ9D3zx', N'S', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3108, N'W4RHC5TRbE', N'lWoB2wEvK1', N'08XKCcU7cs', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3109, N'evp0VusUii', N'lWoB2wEvK1', N'GgRiWW7KxW', N'S', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3110, N'CvNnMAzJeL', N'lWoB2wEvK1', N'e4y7hfjkGv', N'TA', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3111, N'DeUhXQREW3', N'lWoB2wEvK1', N'T8nJiW3G0b', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3112, N'nqwq5WRmrk', N'lWoB2wEvK1', N'exN2k1hrQS', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3113, N'tq8Afwn7tO', N'lWoB2wEvK1', N'oKTK9qHW1J', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3114, N'SzoKEUyvgg', N'lWoB2wEvK1', N'O6vOCd8tj5', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3115, N'4xzrTORyaC', N'dOAxtyUcfO', N'HMDffuFGit', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3116, N'qeVDkvOXti', N'dOAxtyUcfO', N'OcKm24vGQc', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3117, N'IZKxa6rySE', N'dOAxtyUcfO', N'1Qe0r0bz7X', N'S', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3118, N'l9DSh1426K', N'dOAxtyUcfO', N'9prI7l2STu', N'INT', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3119, N'U1oA4f28uL', N'dOAxtyUcfO', N'TYMsC4v2p9', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
GO
SET IDENTITY_INSERT [dbo].[CrudEitem] OFF
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYLM3AWA', N'5XDCQU13AA', N'5XD29XC3BA', N'Id', N'', N'0', N'', 0, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYNLFBNA', N'5XDCQU13AA', N'5XD29XC6LA', N'Id', N'UserId', N'0', N'', 2, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURMVMA', N'5XDCQU13AA', N'5XD29XCAWA', N'Id', N'UserId', N'0', N'', 1, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURN5GA', N'5XDCQU13AA', N'5XD29XC7WA', N'Id', N'UserId', N'0', N'Sort', 3, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURNAJA', N'5XDCQU13AA', N'5XD29XC9AA', N'Id', N'UserId', N'0', N'', 4, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURNC2A', N'5XDCQU13AA', N'5XD29XCDPA', N'Id', N'UserId', N'0', N'', 5, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5Z642A9LLA', N'5Z5JPZR5HA', N'5Z5BHXK86A', N'Id', N'', N'1', N'', 0, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8J9A1SKGA', N'D8J9A1MFLA', N'5X9RB373ZA', N'Id', N'', N'0', N'', 0, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8J9A1T1AA', N'D8J9A1MFLA', N'5X9RB36MYA', N'Id', N'TableId', N'0', N'', 1, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8JNSZSWHA', N'D8JNSZN7YA', N'5X9RB373ZA', N'Id', N'', N'0', N'', 0, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8JNSZT7JA', N'D8JNSZN7YA', N'5X9RB36MYA', N'Id', N'TableId', N'0', N'', 1, 0, NULL)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'dOAxtyUcfO', N'RgOxvoVpND', N'3DgSQnx0Wz', N'Id', N'', N'0', N'', 0, 0, N'')
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'lWoB2wEvK1', N'2638sRu1lL', N'oOG6kwUBcT', N'Id', N'', N'1', N'Id', 0, 0, N'')
GO
SET IDENTITY_INSERT [dbo].[CrudQitem] ON 
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (2, N'5XDCQUBPRA', N'5XDCQU13AA', N'5XD29XD72A', N'', N'T', N'', N'Like', 0, 0, N'', N'', 0)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (3, N'5XDCS43M4A', N'5XDCQU13AA', N'5XD29XD8JA', N'', N'T', N'', N'Like', 0, 0, N'', N'', 1)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (4, N'5XDCS43PJA', N'5XDCQU13AA', N'5XD29XDARA', N'', N'S', N'Depts', N'Equal', 0, 0, N'', N'', 2)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (5, N'5Z5ZUACK6A', N'5Z5JPZR5HA', N'5Z5BHXMGLA', N'', N'S', N'LeaveTypes', N'Equal', 0, 0, N'', N'', 1)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (6, N'5Z5ZUACL6A', N'5Z5JPZR5HA', N'5Z5BHXMS5A', N'', N'S', N'SignStatuses', N'Equal', 0, 0, N'', N'', 2)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (7, N'5Z87DRL40A', N'5Z5JPZR5HA', N'5Z5BHXMJ7A', N'', N'D', N'', N'InRange', 1, 0, N'', N'', 0)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (8, N'D8J9A1MWSA', N'D8J9A1MFLA', N'5X9RB3GRZA', N'', N'S', N'Projects', N'Equal', 0, 0, N'', N'', 0)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (9, N'D8J9A1NEQA', N'D8J9A1MFLA', N'5YFVJXCCVA', N'', N'T', N'', N'Like', 0, 0, N'', N'', 1)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (10, N'D8J9A1NUSA', N'D8J9A1MFLA', N'5X9RB3GT3A', N'', N'T', N'', N'Like', 0, 0, N'', N'', 2)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (11, N'D8JEACLSTA', N'D8J9A1MFLA', N'D58FUTT5TA', N'', N'S', N'YesNos', N'Equal', 0, 0, N'', N'', 3)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (12, N'D8JNSZNM8A', N'D8JNSZN7YA', N'5X9RB3GRZA', N'', N'S', N'Projects', N'Equal', 0, 0, N'', N'', 0)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (13, N'D8JNSZP38A', N'D8JNSZN7YA', N'5YFVJXCCVA', N'', N'T', N'', N'Like', 0, 0, N'', N'', 1)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (14, N'D8JNSZPJJA', N'D8JNSZN7YA', N'5X9RB3GT3A', N'', N'T', N'', N'Like', 0, 0, N'', N'', 2)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (15, N'D8JNSZQ05A', N'D8JNSZN7YA', N'D58FUTT5TA', N'', N'S', N'YesNos', N'Equal', 0, 0, N'', N'', 3)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1022, N'XqUYI5eki2', N'2638sRu1lL', N'qH3wMFow2l', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 0)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1023, N'4Rk2YOj6PY', N'2638sRu1lL', N'toPiQ9D3zx', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 1)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1024, N'TdYK7irH8u', N'2638sRu1lL', N'GgRiWW7KxW', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 2)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1025, N'CxG0YN0aH0', N'2638sRu1lL', N'08XKCcU7cs', N'', N'T', N'', N'Like2', 0, 0, N'', N'', 3)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1026, N'Ycc3TusGnI', N'2638sRu1lL', N'T8nJiW3G0b', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 4)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1027, N'wPtvUH6Mwr', N'RgOxvoVpND', N'OcKm24vGQc', N'', N'T', N'', N'Like2', 0, 0, N'', N'', 0)
GO
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1028, N'KsAnSwALYl', N'RgOxvoVpND', N'1Qe0r0bz7X', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 1)
GO
SET IDENTITY_INSERT [dbo].[CrudQitem] OFF
GO
SET IDENTITY_INSERT [dbo].[CrudRitem] ON 
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (8, N'5XEXK6A9SA', N'5XDCQU13AA', N'Account', N'帳號', 0, N'0', 0)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (9, N'5XEXK6ASFA', N'5XDCQU13AA', N'Name', N'使用者名稱', 0, N'0', 1)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (10, N'5XEXK6B26A', N'5XDCQU13AA', N'DeptName', N'部門', 0, N'0', 2)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (11, N'5XEXK6B5MA', N'5XDCQU13AA', N'Status', N'資料狀態', 0, N'SS', 3)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (12, N'5XEXK6B9RA', N'5XDCQU13AA', N'_Fun', N'維護', 0, N'CF', 4)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (13, N'5Z5ZUACLWA', N'5Z5JPZR5HA', N'UserId', N'請假人', 0, N'0', 0)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (14, N'5Z5ZUACMUA', N'5Z5JPZR5HA', N'AgentId', N'代理人', 0, N'0', 1)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (15, N'5Z5ZUACP0A', N'5Z5JPZR5HA', N'LeaveType', N'假別', 0, N'0', 2)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (16, N'5Z5ZUACPQA', N'5Z5JPZR5HA', N'StartTime', N'開始時間', 0, N'DT', 3)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (17, N'5Z5ZUACQUA', N'5Z5JPZR5HA', N'EndTime', N'結束時間', 0, N'DT', 4)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (18, N'5Z5ZUACRPA', N'5Z5JPZR5HA', N'Hours', N'請假時數', 0, N'0', 5)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (19, N'5Z5ZUACTKA', N'5Z5JPZR5HA', N'FlowSignStatus', N'流程簽核狀態', 0, N'0', 6)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (20, N'5Z5ZUACUHA', N'5Z5JPZR5HA', N'Created', N'Created', 0, N'DT', 7)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (21, N'D8J9A1PT9A', N'D8J9A1MFLA', N'ProjectCode', N'專案', 0, N'0', 0)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (22, N'D8J9A1Q72A', N'D8J9A1MFLA', N'Code', N'資料表代碼', 0, N'0', 2)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (23, N'D8J9A1QPKA', N'D8J9A1MFLA', N'Name', N'資料表名稱', 0, N'0', 3)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (24, N'D8J9A1R5AA', N'D8J9A1MFLA', N'TranLog', N'是否記錄交易', 0, N'YE', 4)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (25, N'D8J9A1RMEA', N'D8J9A1MFLA', N'_Fun', N'維護', 0, N'CF', 5)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (26, N'D8J9A1S3AA', N'D8J9A1MFLA', N'Status', N'資料狀態', 0, N'SN', 6)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (27, N'D8JAARUJEA', N'D8J9A1MFLA', N'DbName', N'資料庫', 0, N'0', 1)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (28, N'D8JNSZQGBA', N'D8JNSZN7YA', N'ProjectCode', N'專案Id', 0, N'0', 0)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (29, N'D8JNSZQZ8A', N'D8JNSZN7YA', N'Code', N'資料表代碼', 0, N'0', 2)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (30, N'D8JNSZRD6A', N'D8JNSZN7YA', N'Name', N'資料表名稱', 0, N'0', 3)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (31, N'D8JNSZRV4A', N'D8JNSZN7YA', N'TranLog', N'是否記錄交易', 0, N'YE', 4)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (32, N'D8JNSZSBAA', N'D8JNSZN7YA', N'Status', N'資料狀態', 0, N'SN', 6)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (33, N'D8JPP0VNCA', N'D8JNSZN7YA', N'DbName', N'資料庫名稱', 0, N'0', 1)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (34, N'D8JPP0W6JA', N'D8JNSZN7YA', N'_Fun', N'維護', 0, N'CF', 5)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3042, N'KtR7xL0cuW', N'2638sRu1lL', N'Id', N'Id', 0, N'0', 0)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3043, N'cH0jUxIWHq', N'2638sRu1lL', N'ProgId', N'功能', 0, N'0', 1)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3044, N'uhI32dA4YK', N'2638sRu1lL', N'OwnerId', N'擁有者', 0, N'0', 2)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3045, N'lYcwPni4wB', N'2638sRu1lL', N'Title', N'Title', 0, N'0', 3)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3046, N'v67CMOihaT', N'2638sRu1lL', N'IssueType', N'資料種類', 0, N'0', 4)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3047, N'QETKb1JuCd', N'2638sRu1lL', N'Creator', N'建檔人員', 0, N'0', 5)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3048, N'j842mikfO2', N'2638sRu1lL', N'Reviser', N'修改人員', 0, N'0', 6)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3049, N'Kf9wNOsrwH', N'RgOxvoVpND', N'Name', N'功能名稱', 0, N'0', 0)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3050, N'crZ1G6kuii', N'RgOxvoVpND', N'ProjectId', N'專案', 0, N'0', 1)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3051, N'8DjyNemrbr', N'RgOxvoVpND', N'Sort', N'排序', 0, N'0', 2)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3052, N'aFrbpjrAZ1', N'RgOxvoVpND', N'Status', N'狀態', 0, N'SN', 3)
GO
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3053, N'vFblllhsm0', N'RgOxvoVpND', N'_fun', N'功能', 0, N'CF', 4)
GO
SET IDENTITY_INSERT [dbo].[CrudRitem] OFF
GO
SET IDENTITY_INSERT [dbo].[Issue] ON 
GO
INSERT [dbo].[Issue] ([Sn], [Id], [ProjectId], [ProgId], [OwnerId], [IssueType], [WorkDate], [WorkHours], [Title], [Note], [IsFinish], [RptDeptCode], [RptDeptId], [RptUser], [RptType], [Creator], [Created], [Reviser], [Revised]) VALUES (1, N'AwwQVmNGQ7', N'bu040syNlI', N'T6eAWTQc8M', N'Bruce', N'R', CAST(N'2025-02-03T00:00:00' AS SmallDateTime), 1, N'test1', N'test1', 1, N'', NULL, N'', N'', N'Bruce', CAST(N'2025-02-03T08:51:54.000' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Issue] OFF
GO
SET IDENTITY_INSERT [dbo].[IssueFile] ON 
GO
INSERT [dbo].[IssueFile] ([Sn], [Id], [IssueId], [FileName], [Creator], [Created]) VALUES (1, N'borCKm5ANt', N'Ga0KfnbQNq', N'遊樂場地圖.png', N'Bruce', CAST(N'2024-12-12T11:00:56.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[IssueFile] OFF
GO
INSERT [dbo].[PrjProg] ([Id], [Name], [ProjectId], [Sort], [Status], [Creator]) VALUES (N'T6eAWTQc8M', N'功能1', N'bu040syNlI', 1, 1, N'Bruce')
GO
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'D58WWHCYQA', N'尋寶', N'BaoAdm', N'Bao', 0, N'd:\_project\BaoAdm', N'data source=(localdb)\mssqllocaldb;initial catalog=Bao;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1, 0, N'Bruce', CAST(N'2024-11-01T14:29:48.253' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'Db', N'資料庫文件', N'DbAdm', N'Db', 0, N'D:\_project\DbAdm', N'data source=.\SqlExpress;initial catalog=Db;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1, 0, N'Bruce', CAST(N'2024-11-01T14:29:48.253' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'Hr', N'Hr人事', N'HrAdm', N'Hr', 0, N'D:\_project\HrAdm', N'data source=(localdb)\mssqllocaldb;initial catalog=Hr;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1, 0, N'Bruce', CAST(N'2024-11-01T14:29:48.253' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Table] ON 
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (79, N'5X9RB36MYA', N'Db', N'Column', N'欄位檔', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (80, N'5X9RB36PRA', N'Db', N'Crud', N'CRUD設定', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (81, N'5X9RB36TCA', N'Db', N'CrudEitem', N'CRUD維護欄位', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (82, N'5X9RB36VLA', N'Db', N'CrudEtable', N'CRUD維護資料表', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (83, N'5X9RB36XEA', N'Db', N'CrudQitem', N'CRUD查詢欄位', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (84, N'5X9RB36ZCA', N'Db', N'CrudRitem', N'CRUD查詢結果欄位', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (85, N'5X9RB3720A', N'Db', N'Project', N'專案檔', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (86, N'5X9RB373ZA', N'Db', N'Table', N'資料表檔', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (87, N'5XD29XBSMA', N'Hr', N'Dept', N'部門', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (88, N'5XD29XC3BA', N'Hr', N'User', N'使用者', N'', 1, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (89, N'5XD29XC6LA', N'Hr', N'UserJob', N'工作經驗', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (90, N'5XD29XC7WA', N'Hr', N'UserLang', N'語言能力', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (91, N'5XD29XC9AA', N'Hr', N'UserLicense', N'用戶證照', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (92, N'5XD29XCAWA', N'Hr', N'UserSchool', N'學歷資料', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (93, N'5XD29XCDPA', N'Hr', N'UserSkill', N'專業技能', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (94, N'5Z5BHXK86A', N'Hr', N'Leave', N'假單', N'', 1, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (95, N'D58J2RM39A', N'Db', N'XpCode', N'雜項檔', N'', 1, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (96, N'D58LXKZJUA', N'Hr', N'Cms', N'CMS', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (97, N'D58LXL00BA', N'Hr', N'CustInput', N'自訂輸入欄位', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (98, N'D58LXL0GHA', N'Hr', N'XpCode', N'雜項檔', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (99, N'D58LXL0Y0A', N'Hr', N'XpEasyRpt', N'簡單報表', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (100, N'D58LXL1D4A', N'Hr', N'XpFlow', N'流程', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (101, N'D58LXL1VTA', N'Hr', N'XpFlowLine', N'流程線', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (102, N'D58LXL2A8A', N'Hr', N'XpFlowNode', N'流程節點', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (103, N'D58LXL2SLA', N'Hr', N'XpFlowSign', N'流程簽核資料', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (104, N'D58LXL378A', N'Hr', N'XpImportLog', N'匯入資料', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (105, N'D58LXL3N4A', N'Hr', N'XpProg', N'系統功能', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (106, N'D58LXL44TA', N'Hr', N'XpRole', N'角色', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (107, N'D58LXL4KKA', N'Hr', N'XpRoleProg', N'角色功能', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (108, N'D58LXL50NA', N'Hr', N'XpTranLog', N'交易記錄', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (109, N'D58LXL5FUA', N'Hr', N'XpUserRole', N'用戶角色', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (110, N'D58WX60WVA', N'D58WWHCYQA', N'Attend', N'手機用戶參加尋寶資料', N'', 0, 0)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (111, N'D58WX61CCA', N'D58WWHCYQA', N'Bao', N'尋寶資料', N'', 1, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (112, N'D58WX61TFA', N'D58WWHCYQA', N'Cms', N'CMS內容', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (113, N'D58WX627KA', N'D58WWHCYQA', N'Reply', N'用戶答題資料', N'', 0, 0)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (114, N'D58WX62PGA', N'D58WWHCYQA', N'Stage', N'尋寶關卡', N'', 1, 0)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (115, N'D58WX634WA', N'D58WWHCYQA', N'User', N'管理系統用戶', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (116, N'D58WX63L5A', N'D58WWHCYQA', N'UserApp', N'手機用戶資料', N'', 1, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (117, N'D58WX6485A', N'D58WWHCYQA', N'UserCust', N'客戶資料', N'', 1, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (118, N'D8ZRXETU8A', N'D58WWHCYQA', N'BaoAttend', N'App用戶參加者資料', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (119, N'D8ZRXEUAEA', N'D58WWHCYQA', N'BaoReply', N'用戶答題資料', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (120, N'D8ZRXEUS7A', N'D58WWHCYQA', N'BaoStage', N'尋寶關卡', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (121, N'D9QTSQF55A', N'D58WWHCYQA', N'XpCode', N'雜項檔', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1470, N'oOG6kwUBcT', N'Db', N'Issue', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1471, N'iskfQCWWld', N'Db', N'MCTDDbDefinition', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1472, N'AHODXbOs21', N'Db', N'MCTMDbDefinition', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1473, N'GP5KoCoFVL', N'Db', N'tmpColumn', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1474, N'6QsXKBAf4h', N'Db', N'tmpTable', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1475, N'bnZnlLytAh', N'Db', N'XpDept', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1476, N'6hxO6mna5B', N'Db', N'XpProg', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1477, N'Shc53pKlhR', N'Db', N'XpRole', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1478, N'RGGtEcyABd', N'Db', N'XpRoleProg', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1479, N'N28UZ1M3aY', N'Db', N'XpUser', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1480, N'e6HaNyL2vi', N'Db', N'XpUserRole', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1481, N'3DgSQnx0Wz', N'Db', N'PrjProg', N'', N'', 0, 1)
GO
SET IDENTITY_INSERT [dbo].[Table] OFF
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'AuthRoles', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'RoleName', N'AuthRoles', N'varchar(45)', 1, N'', 2, N'角色名稱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'CustomerContract', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContractNo', N'CustomerContract', N'varchar(20)', 0, N'', 2, N'合約編號')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProjectNo', N'CustomerContract', N'varchar(20)', 0, N'', 3, N'專案代碼')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProjectName', N'CustomerContract', N'varchar(30)', 1, N'', 4, N'專案名稱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'TaxId', N'CustomerContract', N'char(8)', 0, N'', 5, N'客戶統一編號')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Name', N'CustomerContract', N'varchar(50)', 1, N'', 6, N'客戶名稱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Address', N'CustomerContract', N'varchar(100)', 1, N'', 7, N'公司地址')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Telephone', N'CustomerContract', N'varchar(20)', 1, N'', 8, N'電話')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Email', N'CustomerContract', N'varchar(100)', 1, N'', 9, N'Email')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContractStart', N'CustomerContract', N'datetime', 0, N'', 10, N'合約有效期-起')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContractEnd', N'CustomerContract', N'datetime', 0, N'', 11, N'合約有效期-迄')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactName', N'CustomerContract', N'varchar(50)', 1, N'', 12, N'客戶聯絡窗口')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'FhProductDesc', N'CustomerContract', N'varchar(100)', 1, N'', 13, N'富鴻網產品描述')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'FhContactName', N'CustomerContract', N'varchar(50)', 1, N'', 14, N'富鴻網聯絡窗口')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProductPDM', N'CustomerContract', N'varchar(50)', 1, N'', 15, N'富鴻網產品PDM')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProductPJM', N'CustomerContract', N'varchar(50)', 1, N'', 16, N'富鴻網產品PJM')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AutoRepair', N'CustomerContract', N'tinyint(1)', 1, N'0', 17, N'啟動自動派維修工單')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'CustomerMapping', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'UniNumber', N'CustomerMapping', N'varchar(20)', 0, N'', 2, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CategoryName', N'CustomerMapping', N'varchar(50)', 1, N'', 3, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MixCategoryId', N'CustomerMapping', N'varchar(50)', 1, N'', 4, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'CustomerRepair', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkOrderNo', N'CustomerRepair', N'varchar(20)', 0, N'', 2, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CustomerContractId', N'CustomerRepair', N'varchar(50)', 0, N'', 3, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'RepairDateTime', N'CustomerRepair', N'datetime', 0, N'', 4, N'報修日期、時間')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProblemMain', N'CustomerRepair', N'varchar(50)', 0, N'', 5, N'障礙主類')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProblemSub', N'CustomerRepair', N'varchar(50)', 0, N'', 6, N'障礙次類')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProblemDesc', N'CustomerRepair', N'varchar(100)', 1, N'', 7, N'描述障礙內容')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactrName', N'CustomerRepair', N'varchar(100)', 1, N'', 8, N'描述障礙內容')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactrTel', N'CustomerRepair', N'varchar(100)', 1, N'', 9, N'描述障礙內容')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactrEmail', N'CustomerRepair', N'varchar(100)', 1, N'', 10, N'描述障礙內容')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'VideoPath', N'CustomerRepair', N'varchar(200)', 1, N'', 11, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'Department', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Dept', N'Department', N'varchar(50)', 1, N'', 2, N'部門')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Team', N'Department', N'varchar(50)', 1, N'', 3, N'組別')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'OriginSource', N'Department', N'varchar(50)', 1, N'', 4, N'原始來源')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeId', N'Employee', N'varchar(20)', 0, N'', 1, N'帳號')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Name', N'Employee', N'varchar(30)', 1, N'', 2, N'員工姓名')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ENGName', N'Employee', N'varchar(30)', 1, N'', 3, N'員工英文名稱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Phone', N'Employee', N'varchar(20)', 1, N'', 4, N'聯絡電話')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Email', N'Employee', N'varchar(50)', 1, N'', 5, N'電子信箱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'PWD', N'Employee', N'varchar(50)', 1, N'', 6, N'密碼')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Origin', N'Employee', N'varchar(50)', 1, N'', 7, N'來源')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'PhoneToken', N'Employee', N'varchar(100)', 1, N'', 8, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'DepartmentId', N'Employee', N'varchar(50)', 0, N'', 9, N'部門')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeStatus', N'Employee', N'int(11)', 1, N'', 10, N'帳號狀態')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'EmployeeArea', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CityCode', N'EmployeeArea', N'varchar(45)', 1, N'', 2, N'城市代碼')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CityName', N'EmployeeArea', N'varchar(45)', 1, N'', 3, N'城市名稱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AreaCode', N'EmployeeArea', N'varchar(45)', 1, N'', 4, N'郵遞區號')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AreaName', N'EmployeeArea', N'varchar(45)', 1, N'', 5, N'區域名稱(鄉鎮市區)')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'SerialNum', N'EmployeeArea', N'int(11)', 1, N'0', 6, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'EmployeeAuthWork', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeId', N'EmployeeAuthWork', N'varchar(20)', 0, N'', 2, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkCategoryId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 3, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'RegionWorkClass', N'EmployeeAuthWork', N'varchar(10)', 1, N'', 4, N'Region/WorkClass')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeAreaId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 5, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkClassId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 6, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuthRolesId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 7, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanCreate', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 8, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanRead', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 9, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanDelete', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 10, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanUpdate', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 11, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'Errorlog', N'varchar(36)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'DateTime', N'Errorlog', N'datetime', 0, N'', 2, N'發生時間')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeId', N'Errorlog', N'varchar(45)', 0, N'', 3, N'登入帳號')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Environment', N'Errorlog', N'varchar(45)', 0, N'', 4, N'環境 (Web、App)')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ExceptionPath', N'Errorlog', N'varchar(100)', 0, N'', 5, N'例外發生位置')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ExceptionMessageJson', N'Errorlog', N'varchar(1000)', 0, N'', 6, N'例外訊息Json')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'MixCategories', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Category', N'MixCategories', N'varchar(30)', 1, N'', 2, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnDescribe', N'MixCategories', N'varchar(50)', 1, N'', 3, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnValue', N'MixCategories', N'varchar(50)', 1, N'', 4, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnType', N'MixCategories', N'varchar(50)', 1, N'', 5, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ParentCategoryId', N'MixCategories', N'varchar(50)', 1, N'', 6, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnSort', N'MixCategories', N'int(11)', 1, N'', 7, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkClass', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ClassName', N'WorkClass', N'varchar(45)', 1, N'', 2, N'類別名稱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ClassPath', N'WorkClass', N'varchar(45)', 1, N'', 3, N'類別路徑')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ParentId', N'WorkClass', N'varchar(50)', 1, N'', 4, N'上層類別 Id')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Sort', N'WorkClass', N'int(11)', 1, N'0', 5, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkOrderImage', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkOrderId', N'WorkOrderImage', N'varchar(50)', 0, N'', 2, N'工單號碼 Id')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ImageSort', N'WorkOrderImage', N'int(11)', 0, N'', 3, N'影像排序')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ImageType', N'WorkOrderImage', N'varchar(50)', 1, N'', 4, N'影像分類')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ImagePath', N'WorkOrderImage', N'varchar(100)', 0, N'', 5, N'影像名稱')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkOrderNo', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Product', N'WorkOrderNo', N'varchar(1)', 0, N'', 2, N'工單字軌')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkNo', N'WorkOrderNo', N'int(11)', 0, N'', 3, N'工單單日流水號')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MaxNo', N'WorkOrderNo', N'int(11)', 0, N'', 4, N'單日流水號最大值')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MinNo', N'WorkOrderNo', N'int(11)', 0, N'', 5, N'單日流水號最小值')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Date', N'WorkOrderNo', N'datetime', 0, N'', 6, N'工單號碼分配日期')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkProcedure', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkOrderId', N'WorkProcedure', N'varchar(50)', 0, N'', 2, N'工單號碼 Id')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorDate', N'WorkProcedure', N'datetime', 1, N'', 3, N'審核時間')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorDescription', N'WorkProcedure', N'varchar(100)', 1, N'', 4, N'審核結果說明')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorEmployeeId', N'WorkProcedure', N'varchar(20)', 1, N'', 5, N'審核人員 Id ')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CheckPoint', N'WorkProcedure', N'varchar(50)', 1, N'', 6, N'審核節點')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorStatus', N'WorkProcedure', N'tinyint(1)', 1, N'', 7, N'審核結果')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkResponse', N'varchar(50)', 0, N'', 1, N'')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CustomerRepairId', N'WorkResponse', N'varchar(50)', 0, N'', 2, N'報修工單 Id')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkDatetime', N'WorkResponse', N'datetime', 1, N'', 3, N'派工日期時間')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProcessDatetime', N'WorkResponse', N'datetime', 1, N'', 4, N'處理日期時間')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MaintainProcessDesc', N'WorkResponse', N'varchar(100)', 1, N'', 5, N'維運處理描述')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkEmpId', N'WorkResponse', N'varchar(20)', 1, N'', 6, N'施工人員 Id')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditEmpId', N'WorkResponse', N'varchar(20)', 1, N'', 7, N'審核人員 Id')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'PmEmpId', N'WorkResponse', N'varchar(20)', 1, N'', 8, N'主管單位 Id')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkStatusMappingId', N'WorkResponse', N'varchar(50)', 1, N'', 9, N'工單進程 Id')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'AuthRoles', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'CustomerContract', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'CustomerMapping', N'客戶對應設定')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'CustomerRepair', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'Department', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'Employee', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'EmployeeArea', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'EmployeeAuthWork', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'Errorlog', N'異常錯誤Log')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'MixCategories', N'各類別主檔')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkClass', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkOrderImage', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkOrderNo', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkProcedure', N'')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkResponse', N'')
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'0', N'無', 1, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'1', N'個人', 2, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'2', N'部門', 3, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'9', N'全部', 4, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'0', N'無', 1, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'1', N'Controller', 2, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'2', N'Action', 3, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'0', N'None', 1, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Email', N'Email', 2, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Max', N'Max', 5, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Min', N'Min', 4, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Range', N'Range', 6, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Url', N'Url', 3, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'C', N'CheckBox', 7, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'D', N'Date', 9, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'DEC', N'Decimal', 5, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'DT', N'DateTime', 10, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'F', N'File', 11, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'H', N'Hide', 1, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'HTML', N'Html', 12, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'INT', N'Integer', 4, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'MO', N'Modal', 14, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'PWD', N'Password', 15, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'R', N'Radio', 8, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'RO', N'ReadOnly', 16, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'S', N'Select', 6, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'SO', N'Sort', 13, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'T', N'Text', 2, N'Q', NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'TA', N'TextArea', 3, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'C', N'CheckBox', 6, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'D', N'Date', 8, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'DT', N'DateTime', 9, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'F', N'File', 10, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'H', N'Hide', 1, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'MO', N'Modal', 12, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'N', N'Numeric', 4, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'PWD', N'Password', 13, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'R', N'Radio', 7, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'RO', N'Read Only', 14, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'S', N'Select', 5, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'SO', N'Sort', 11, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'T', N'Text', 2, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'TA', N'TextArea', 3, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'K', N'知識', 2, NULL, N'KM')
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'L', N'請假', 4, NULL, N'Leave')
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'M', N'會議', 3, NULL, N'Meeting')
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'O', N'其他', 5, NULL, N'Other')
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'R', N'例行工作', 1, NULL, N'Routine')
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Equal', N'Equal', 1, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'In', N'In', 4, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'InRange', N'In Range', 12, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Is', N'Is', 9, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'IsNull', N'Is Null', 10, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like', N'Like', 2, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like2', N'Like(模糊)', 5, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like2Cols', N'Like Cols(模糊)', 8, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'LikeCols', N'Like Cols', 7, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'LikeList', N'Like List', 6, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'NotLike', N'Not Like', 3, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'NotNull', N'Not Null', 11, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'UD', N'User Defined', 13, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'0', N'Normal', 1, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'CF', N'Crud Fun', 2, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'SN', N'Status Name', 4, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'SS', N'Set Status', 6, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'UD', N'User Defined', 7, NULL, NULL)
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'YE', N'YesEmpty', 3, NULL, NULL)
GO
INSERT [dbo].[XpDept] ([Id], [Name], [MgrId]) VALUES (N'RD', N'研發部', N'Nick')
GO
INSERT [dbo].[XpDept] ([Id], [Name], [MgrId]) VALUES (N'ST', N'軟體中心', N'Bruce')
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Column', N'Column', N'Column', NULL, N'/Column/Read', 3, 1, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Issue', N'Issue', N'Issue', NULL, N'/Issue/Read', 8, 1, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'MyCrud', N'MyCrud', N'MyCrud', NULL, N'/MyCrud/Read', 4, 1, 0, 1, 1, 0, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'PrjProg', N'PrjProg', N'PrjProg', NULL, N'/PrjProg/Read', 7, 0, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Project', N'Project', N'Project', NULL, N'/Project/Read', 1, 1, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'SetPwd', N'SetPwd', N'SetPwd', NULL, N'/SetPwd/Index', 5, 0, 0, 0, 0, 0, 0, 0, 0, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Table', N'Table', N'Table', NULL, N'/Table/Read', 2, 1, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpProg', N'XpProg', N'XpProg', NULL, N'/XpProg/Read', 7, 0, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpRole', N'XpRole', N'XpRole', NULL, N'/XpRole/Read', 6, 0, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpUser', N'XpUser', N'XpUser', NULL, N'/XpUser/Read', 5, 0, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpRole] ([Id], [Name]) VALUES (N'Adm', N'管理者')
GO
INSERT [dbo].[XpRole] ([Id], [Name]) VALUES (N'All', N'開發者')
GO
INSERT [dbo].[XpRole] ([Id], [Name]) VALUES (N'DeptMgr', N'部門主管')
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'2koAJkBw89', N'Adm', N'XpProg', 1, 0, 0, 0, 0, 0, 0, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'3lZiDGr9R5', N'All', N'Column', 1, 9, 1, 0, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'6IuPtprTF2', N'Adm', N'PrjProg', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'bgZ6GpMNDn', N'Adm', N'Table', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'lckATVuDUg', N'Adm', N'Issue', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'LftpdhJIUf', N'All', N'MyCrud', 1, 9, 2, 0, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'nkyeSv59PR', N'All', N'Table', 1, 9, 1, 0, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'np60Iog2rt', N'All', N'Issue', 1, 9, 1, 1, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'q4jiuKviUm', N'All', N'SetPwd', 0, 0, 0, 0, 0, 0, 0, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'RZbOdEKfUt', N'Adm', N'XpUser', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Sb3k71zgds', N'All', N'Project', 1, 9, 1, 0, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'ThvaGXxpZN', N'Adm', N'Column', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'twEbJKKcOi', N'Adm', N'MyCrud', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'z0fW8NzHUn', N'Adm', N'XpRole', 1, 0, 0, 0, 0, 0, 0, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'zmta9T2gax', N'All', N'PrjProg', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'zNA1tEuwsA', N'Adm', N'Project', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Bruce', N'bruce', N'aa', N'QSS8CpM1wn8IbyS6IHpJEg', N'ST', NULL, 1)
GO
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Dyrel', N'銘豪', N'bb', N'Ia0L2Da5DQj0z2QLTCmOfA', N'ST', NULL, 1)
GO
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Ivan', N'進發', N'ivan', N'QSS8CpM1wn8IbyS6IHpJEg', N'ST', NULL, 1)
GO
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'LOTxPI5WM8', N'test', N'tt', N'', N'ST', NULL, 1)
GO
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Paddy', N'paddy', N'paddy', N'', N'ST', NULL, 1)
GO
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Peter', N'peter', N'peter', N'Udww3cRz1DpgEenrumyncA', N'ST', NULL, 1)
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'001', N'Bruce', N'Adm')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'GRxr11hlYV', N'Bruce', N'All')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'v6LMHPIvls', N'Bruce', N'DeptMgr')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'Vdn6EA6hQM', N'Dyrel', N'All')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'HXytfka6G5', N'Ivan', N'All')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'mI4YJ9yWgD', N'LOTxPI5WM8', N'All')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'h46y8LIE9G', N'Paddy', N'Adm')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'bmjmgIjdnZ', N'Paddy', N'All')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'aDlW0BPg7w', N'Paddy', N'DeptMgr')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'KEyS227lwQ', N'Peter', N'Adm')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'x5LC12AHXQ', N'Peter', N'All')
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'GtV5lJY9mi', N'Peter', N'DeptMgr')
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_DbType]  DEFAULT ((0)) FOR [DbType]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_FromTmpTable]  DEFAULT ((0)) FOR [FromTmpTable]
GO
ALTER TABLE [dbo].[Table] ADD  CONSTRAINT [DF_Table_TranLog]  DEFAULT ((0)) FOR [TranLog]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_Sort]  DEFAULT ((9)) FOR [Sort]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_AuthRow]  DEFAULT ((0)) FOR [AuthRow]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunCreate]  DEFAULT ((0)) FOR [FunCreate]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunRead]  DEFAULT ((0)) FOR [FunRead]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunUpdate]  DEFAULT ((0)) FOR [FunUpdate]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunDelete]  DEFAULT ((0)) FOR [FunDelete]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunPrint]  DEFAULT ((0)) FOR [FunPrint]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunExport]  DEFAULT ((0)) FOR [FunExport]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunView]  DEFAULT ((0)) FOR [FunView]
GO
ALTER TABLE [dbo].[XpProg] ADD  CONSTRAINT [DF_XpProg_FunOther]  DEFAULT ((0)) FOR [FunOther]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunCreate]  DEFAULT ((0)) FOR [FunCreate]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunRead]  DEFAULT ((0)) FOR [FunRead]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunUpdate]  DEFAULT ((0)) FOR [FunUpdate]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunDelete]  DEFAULT ((0)) FOR [FunDelete]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunPrint]  DEFAULT ((0)) FOR [FunPrint]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunExport]  DEFAULT ((0)) FOR [FunExport]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunView]  DEFAULT ((0)) FOR [FunView]
GO
ALTER TABLE [dbo].[XpRoleProg] ADD  CONSTRAINT [DF_XpRoleProg_FunOther]  DEFAULT ((0)) FOR [FunOther]
GO
ALTER TABLE [dbo].[CrudEitem]  WITH CHECK ADD  CONSTRAINT [FK_CrudEitem_CrudEtable] FOREIGN KEY([EtableId])
REFERENCES [dbo].[CrudEtable] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CrudEitem] CHECK CONSTRAINT [FK_CrudEitem_CrudEtable]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'權限種類, 0(無), 1(Ctrl), 2(Action)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Crud', @level2type=N'COLUMN',@level2name=N'AuthType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建檔人員' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Creator'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建檔日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Created'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改人員' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Reviser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Issue', @level2type=N'COLUMN',@level2name=N'Revised'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建檔人員' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'Creator'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建檔日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'Created'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改人員' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'Reviser'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'修改日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'Revised'
GO
