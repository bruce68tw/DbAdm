USE [Db]
GO
/****** Object:  Table [dbo].[Column]    Script Date: 2025/7/11 下午 05:24:53 ******/
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
/****** Object:  Table [dbo].[Crud]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[CrudEitem]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[CrudEtable]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[CrudQitem]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[CrudRitem]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[DataDict]    Script Date: 2025/7/11 下午 05:24:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DataDict](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](30) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[DataType] [varchar](20) NOT NULL,
	[Nullable] [bit] NOT NULL,
	[DefaultValue] [varchar](100) NULL,
	[Note] [nvarchar](255) NULL,
	[TableType] [varchar](10) NULL,
 CONSTRAINT [PK_DataDict] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Issue]    Script Date: 2025/7/11 下午 05:24:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Issue](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[zz_ProjectId] [varchar](10) NULL,
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
	[SendTimes] [tinyint] NOT NULL,
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
/****** Object:  Table [dbo].[IssueFile]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[IssueRelat]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[IssueWatch]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[PrjProg]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[Project]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[Reporter]    Script Date: 2025/7/11 下午 05:24:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reporter](
	[Id] [varchar](10) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Email] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Reporter] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Survey]    Script Date: 2025/7/11 下午 05:24:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Survey](
	[Sn] [int] IDENTITY(1,1) NOT NULL,
	[Id] [varchar](10) NOT NULL,
	[UserId] [varchar](10) NOT NULL,
	[Q1] [tinyint] NOT NULL,
	[Q2] [tinyint] NOT NULL,
	[Q3] [tinyint] NOT NULL,
	[Q4] [tinyint] NOT NULL,
	[Q5] [nvarchar](100) NULL,
	[Created] [datetime] NOT NULL,
 CONSTRAINT [PK_Survey] PRIMARY KEY CLUSTERED 
(
	[Sn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Table]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[tmpColumn]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[tmpColumnImport]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[tmpTable]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[XpCode]    Script Date: 2025/7/11 下午 05:24:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[XpCode](
	[Type] [varchar](20) NOT NULL,
	[Value] [varchar](10) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
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
/****** Object:  Table [dbo].[XpDept]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[XpProg]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[XpRole]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[XpRoleProg]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[XpUser]    Script Date: 2025/7/11 下午 05:24:54 ******/
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
/****** Object:  Table [dbo].[XpUserRole]    Script Date: 2025/7/11 下午 05:24:54 ******/
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

INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1, N'15ZQD4ED1A', N'D58LXL44TA', N'test', N'test', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (931, N'5X9RB37ZKA', N'5X9RB36MYA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (932, N'5X9RB381FA', N'5X9RB36MYA', N'TableId', N'資料表Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (933, N'5X9RB3845A', N'5X9RB36MYA', N'Name', N'欄位名稱', N'nvarchar(30)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (934, N'5X9RB3890A', N'5X9RB36MYA', N'DataType', N'資料型態', N'varchar(20)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (935, N'5X9RB38APA', N'5X9RB36MYA', N'Nullable', N'可空值', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (936, N'5X9RB38E9A', N'5X9RB36MYA', N'DefaultValue', N'預設值', N'varchar(100)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (937, N'5X9RB38G3A', N'5X9RB36MYA', N'Sort', N'排序', N'int', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (938, N'5X9RB38HTA', N'5X9RB36MYA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (939, N'5X9RB38KTA', N'5X9RB36MYA', N'Status', N'資料狀態', N'bit', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (940, N'5X9RB38NHA', N'5X9RB36PRA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (941, N'5X9RB38QJA', N'5X9RB36PRA', N'ProjectId', N'專案Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (942, N'5X9RB395WA', N'5X9RB36PRA', N'LabelHori', N'水平Label', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (943, N'5X9RB397PA', N'5X9RB36PRA', N'ReadSql', N'查詢Sql', N'varchar(500)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (944, N'5X9RB39DFA', N'5X9RB36PRA', N'TableAs', N'資料表別名', N'varchar(10)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (945, N'5X9RB39FLA', N'5X9RB36PRA', N'HasCreate', N'Create功能', N'bit', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (946, N'5X9RB39HDA', N'5X9RB36PRA', N'HasUpdate', N'Update功能', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (947, N'5X9RB39L2A', N'5X9RB36PRA', N'HasDelete', N'Delete功能', N'bit', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (948, N'5X9RB39NSA', N'5X9RB36PRA', N'HasView', N'View功能', N'bit', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (949, N'5X9RB39QUA', N'5X9RB36PRA', N'HasExport', N'Export功能', N'bit', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (950, N'5X9RB39TLA', N'5X9RB36PRA', N'HasReset', N'Reset功能', N'bit', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (951, N'5X9RB39VJA', N'5X9RB36PRA', N'Status', N'資料狀態', N'bit', 0, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (952, N'5X9RB39XPA', N'5X9RB36TCA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (953, N'5X9RB3A19A', N'5X9RB36TCA', N'EtableId', N'EtableId', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (954, N'5X9RB3A4CA', N'5X9RB36TCA', N'InputType', N'輸入類型', N'varchar(10)', 0, N'', 4, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (955, N'5X9RB3A6GA', N'5X9RB36TCA', N'InputData', N'輸入資料', N'nvarchar(50)', 1, N'', 5, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (956, N'5X9RB3A9JA', N'5X9RB36TCA', N'Required', N'必填', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (957, N'5X9RB3ABDA', N'5X9RB36TCA', N'HasCreate', N'Create功能', N'bit', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (958, N'5X9RB3ACRA', N'5X9RB36TCA', N'HasUpdate', N'Update功能', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (959, N'5X9RB3AE4A', N'5X9RB36TCA', N'PlaceHolder', N'PlaceHolder', N'varchar(10)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (960, N'5X9RB3AHCA', N'5X9RB36TCA', N'DefaultValue', N'預設值', N'varchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (961, N'5X9RB3AT3A', N'5X9RB36TCA', N'PosGroup', N'同列', N'varchar(10)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (962, N'5X9RB3BH2A', N'5X9RB36TCA', N'LayoutCols', N'版位', N'varchar(10)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (963, N'5X9RB3DMHA', N'5X9RB36TCA', N'Width', N'欄位寬度', N'int', 0, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (964, N'5X9RB3E38A', N'5X9RB36TCA', N'CheckType', N'檢查類型', N'varchar(10)', 0, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (965, N'5X9RB3E4QA', N'5X9RB36TCA', N'CheckData', N'檢查資料', N'varchar(10)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (966, N'5X9RB3E6SA', N'5X9RB36TCA', N'Sort', N'排序', N'int', 0, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (967, N'5X9RB3E8JA', N'5X9RB36VLA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (968, N'5X9RB3EAAA', N'5X9RB36VLA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (969, N'5X9RB3EBUA', N'5X9RB36VLA', N'TableId', N'資料表Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (970, N'5X9RB3EDAA', N'5X9RB36VLA', N'Kid', N'主鍵Id', N'varchar(10)', 0, N'', 4, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (971, N'5X9RB3EEPA', N'5X9RB36VLA', N'MapFid', N'外鍵Id', N'varchar(10)', 1, N'', 5, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (972, N'5X9RB3EG4A', N'5X9RB36VLA', N'Col4', N'Col4', N'varchar(30)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (973, N'5X9RB3EHJA', N'5X9RB36VLA', N'OrderBy', N'OrderBy', N'varchar(10)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (974, N'5X9RB3EK8A', N'5X9RB36VLA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (975, N'5X9RB3ELQA', N'5X9RB36XEA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (976, N'5X9RB3ENRA', N'5X9RB36XEA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (977, N'5X9RB3F0AA', N'5X9RB36XEA', N'TableAs', N'資料表別名', N'varchar(20)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (978, N'5X9RB3FABA', N'5X9RB36XEA', N'InputType', N'輸入類型', N'varchar(20)', 0, N'', 5, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (979, N'5X9RB3FC9A', N'5X9RB36XEA', N'InputData', N'輸入資料', N'varchar(20)', 1, N'', 6, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (980, N'5X9RB3FELA', N'5X9RB36XEA', N'Op', N'比對方式', N'varchar(10)', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (981, N'5X9RB3FG9A', N'5X9RB36XEA', N'IsRange', N'Range比對', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (982, N'5X9RB3FHUA', N'5X9RB36XEA', N'IsFind2', N'進階查詢', N'bit', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (983, N'5X9RB3FKDA', N'5X9RB36XEA', N'PosGroup', N'同列', N'varchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (984, N'5X9RB3FM3A', N'5X9RB36XEA', N'LayoutCols', N'版位', N'varchar(20)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (985, N'5X9RB3FNUA', N'5X9RB36XEA', N'ExtInfo', N'其他資料', N'varchar(20)', 1, N'', 12, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (986, N'5X9RB3FQ1A', N'5X9RB36XEA', N'Sort', N'排序', N'int', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (987, N'5X9RB3FRUA', N'5X9RB36ZCA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (988, N'5X9RB3FTJA', N'5X9RB36ZCA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (989, N'5X9RB3G21A', N'5X9RB36ZCA', N'Width', N'欄位寬度', N'int', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (990, N'5X9RB3G3PA', N'5X9RB36ZCA', N'RitemType', N'結果欄位類型', N'varchar(10)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (991, N'5X9RB3G5KA', N'5X9RB36ZCA', N'ExtInfo', N'其他資料', N'varchar(30)', 1, N'', 7, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (992, N'5X9RB3G71A', N'5X9RB36ZCA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (993, N'5X9RB3G8EA', N'5X9RB3720A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (994, N'5X9RB3GG2A', N'5X9RB3720A', N'DbName', N'Db名稱', N'varchar(20)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (995, N'5X9RB3GK9A', N'5X9RB3720A', N'ProjectPath', N'專案路徑', N'varchar(255)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (996, N'5X9RB3GLJA', N'5X9RB3720A', N'ConnectStr', N'Db連線字串', N'varchar(255)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (997, N'5X9RB3GN2A', N'5X9RB3720A', N'Status', N'資料狀態', N'bit', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (998, N'5X9RB3GPHA', N'5X9RB373ZA', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (999, N'5X9RB3GRZA', N'5X9RB373ZA', N'ProjectId', N'專案Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1000, N'5X9RB3GT3A', N'5X9RB373ZA', N'Name', N'資料表名稱', N'nvarchar(30)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1001, N'5X9RB3GWNA', N'5X9RB373ZA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1002, N'5X9RB3GZ3A', N'5X9RB373ZA', N'Status', N'資料狀態', N'bit', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1003, N'5XBA43L8QA', N'5X9RB36TCA', N'ColumnId', N'欄位Id', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1004, N'5XBA43LBNA', N'5X9RB36XEA', N'ColumnId', N'欄位Id', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1005, N'5XD29XCRAA', N'5XD29XBSMA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1006, N'5XD29XCUNA', N'5XD29XBSMA', N'Name', N'部門名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1007, N'5XD29XCW1A', N'5XD29XBSMA', N'MgrId', N'主管Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1008, N'5XD29XD5LA', N'5XD29XC3BA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1009, N'5XD29XD72A', N'5XD29XC3BA', N'Account', N'帳號', N'varchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1010, N'5XD29XD8JA', N'5XD29XC3BA', N'Name', N'使用者名稱', N'nvarchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1011, N'5XD29XDARA', N'5XD29XC3BA', N'DeptId', N'部門', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1012, N'5XD29XDBYA', N'5XD29XC3BA', N'Status', N'資料狀態', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1013, N'5XD29XDDDA', N'5XD29XC6LA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1014, N'5XD29XDF1A', N'5XD29XC6LA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1015, N'5XD29XDGTA', N'5XD29XC6LA', N'JobName', N'工作名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1016, N'5XD29XDKZA', N'5XD29XC6LA', N'JobType', N'工作類型', N'nvarchar(30)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1017, N'5XD29XDN0A', N'5XD29XC6LA', N'JobPlace', N'工作地點', N'nvarchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1018, N'5XD29XDPVA', N'5XD29XC6LA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1019, N'5XD29XDUAA', N'5XD29XC6LA', N'CorpName', N'公司名稱', N'nvarchar(30)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1020, N'5XD29XDVWA', N'5XD29XC6LA', N'CorpUsers', N'公司人數', N'int', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1021, N'5XD29XDXPA', N'5XD29XC6LA', N'IsManaged', N'管理職', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1022, N'5XD29XE1AA', N'5XD29XC6LA', N'JobDesc', N'工作說明', N'varchar(-1)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1023, N'5XD29XE2UA', N'5XD29XC7WA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1024, N'5XD29XE9LA', N'5XD29XC7WA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1025, N'5XD29XFPMA', N'5XD29XC7WA', N'LangName', N'語言名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1026, N'5XD29XFX1A', N'5XD29XC7WA', N'ListenLevel', N'聴力', N'tinyint', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1027, N'5XD29XFZXA', N'5XD29XC7WA', N'SpeakLevel', N'說', N'tinyint', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1028, N'5XD29XG6HA', N'5XD29XC7WA', N'ReadLevel', N'閱讀', N'tinyint', 0, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1029, N'5XD29XG8HA', N'5XD29XC7WA', N'WriteLevel', N'書寫', N'tinyint', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1030, N'5XD29XGACA', N'5XD29XC7WA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1031, N'5XD29XGC3A', N'5XD29XC9AA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1032, N'5XD29XGE9A', N'5XD29XC9AA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1033, N'5XD29XGG3A', N'5XD29XC9AA', N'LicenseName', N'證照名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1034, N'5XD29XGHSA', N'5XD29XC9AA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1035, N'5XD29XGKPA', N'5XD29XC9AA', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1036, N'5XD29XGNVA', N'5XD29XCAWA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1037, N'5XD29XGR4A', N'5XD29XCAWA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1038, N'5XD29XGSRA', N'5XD29XCAWA', N'SchoolName', N'學校名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1039, N'5XD29XGV8A', N'5XD29XCAWA', N'SchoolDept', N'科系', N'nvarchar(20)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1040, N'5XD29XGWUA', N'5XD29XCAWA', N'SchoolType', N'學歷種類', N'nvarchar(20)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1041, N'5XD29XGZGA', N'5XD29XCAWA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1042, N'5XD29XH1CA', N'5XD29XCAWA', N'Graduated', N'是否畢業', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1043, N'5XD29XH4HA', N'5XD29XCDPA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1044, N'5XD29XH6EA', N'5XD29XCDPA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1045, N'5XD29XH8EA', N'5XD29XCDPA', N'SkillName', N'技能名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1046, N'5XD29XHA2A', N'5XD29XCDPA', N'SkillDesc', N'技能說明', N'nvarchar(500)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1047, N'5XLQ99LTVA', N'5XD29XC9AA', N'Sort', N'排序', N'int', 0, N'', 6, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1048, N'5XLQ99LV9A', N'5XD29XCDPA', N'Sort', N'排序', N'int', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1049, N'5YFVGEZSJA', N'5XD29XC3BA', N'Pwd', N'密碼', N'varchar(32)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1050, N'5YFVJXBYXA', N'5X9RB36MYA', N'Code', N'欄位代碼', N'varchar(100)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1051, N'5YFVJXC0WA', N'5X9RB36PRA', N'ProgCode', N'功能代碼', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1052, N'5YFVJXC2BA', N'5X9RB36PRA', N'ProgName', N'功能名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1053, N'5YFVJXC3RA', N'5X9RB36PRA', N'AuthType', N'權限種類', N'tinyint', 0, N'', 14, N'see Code, 0(無), 1(Ctrl), 2(Action)', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1054, N'5YFVJXC4ZA', N'5X9RB36PRA', N'Created', N'建檔時間', N'datetime', 0, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1055, N'5YFVJXC6KA', N'5X9RB36PRA', N'Revised', N'修改時間', N'datetime', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1056, N'5YFVJXC7TA', N'5X9RB36ZCA', N'ColumnCode', N'欄位代碼', N'varchar(100)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1057, N'5YFVJXC9YA', N'5X9RB36ZCA', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1058, N'5YFVJXCB7A', N'5X9RB3720A', N'Code', N'專案代碼', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1059, N'5YFVJXCCVA', N'5X9RB373ZA', N'Code', N'資料表代碼', N'varchar(100)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1060, N'5Z5BHXMCMA', N'5Z5BHXK86A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1061, N'5Z5BHXME5A', N'5Z5BHXK86A', N'UserId', N'請假人', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1062, N'5Z5BHXMFJA', N'5Z5BHXK86A', N'AgentId', N'代理人', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1063, N'5Z5BHXMGLA', N'5Z5BHXK86A', N'LeaveType', N'假別', N'char(1)', 0, N'', 4, N'Code LeaveType', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1064, N'5Z5BHXMJ7A', N'5Z5BHXK86A', N'StartTime', N'開始時間', N'datetime', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1065, N'5Z5BHXMKSA', N'5Z5BHXK86A', N'EndTime', N'結束時間', N'datetime', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1066, N'5Z5BHXMM5A', N'5Z5BHXK86A', N'Hours', N'請假時數', N'decimal', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1067, N'5Z5BHXMS5A', N'5Z5BHXK86A', N'FlowSignStatus', N'流程簽核狀態', N'char(1)', 0, N'', 9, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1068, N'5Z5BHXMU0A', N'5Z5BHXK86A', N'Status', N'資料狀態', N'bit', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1069, N'5Z5BHXMVTA', N'5Z5BHXK86A', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1070, N'5Z5BHXMXVA', N'5Z5BHXK86A', N'Created', N'建檔日期', N'datetime', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1071, N'5Z5BHXMZRA', N'5Z5BHXK86A', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1072, N'5Z5BHXN1KA', N'5Z5BHXK86A', N'Revised', N'修改日期', N'datetime', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1073, N'5ZKB7A6VPA', N'5X9RB36VLA', N'HalfWidth', N'是否半幅寬度', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1074, N'D58FUTP10A', N'5X9RB36TCA', N'EitemType', N'編輯欄位種類', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1075, N'D58FUTPHMA', N'5X9RB36TCA', N'ItemData', N'欄位資料', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1076, N'D58FUTPZ6A', N'5X9RB36VLA', N'PkeyFid', N'主鍵欄位Id', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1077, N'D58FUTQEQA', N'5X9RB36VLA', N'FkeyFid', N'外鍵欄位Id', N'varchar(10)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1078, N'D58FUTQVNA', N'5X9RB36XEA', N'QitemType', N'查詢欄位種類', N'varchar(20)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1079, N'D58FUTRAMA', N'5X9RB36XEA', N'ItemData', N'欄位資料', N'varchar(20)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1080, N'D58FUTT5TA', N'5X9RB373ZA', N'TranLog', N'是否記錄交易', N'bit', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1081, N'D58FV79WAA', N'5Z5BHXK86A', N'FlowLevel', N'流程目前Level', N'tinyint', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1082, N'D58FV7ABUA', N'5Z5BHXK86A', N'FlowStatus', N'流程狀態', N'char(1)', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1083, N'D58FV7ATEA', N'5Z5BHXK86A', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1084, N'D58FV7B84A', N'5XD29XC3BA', N'PhotoFile', N'相片檔名', N'nvarchar(100)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1085, N'D58J2RNGAA', N'D58J2RM39A', N'Type', N'資料類別', N'varchar(20)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1086, N'D58J2RNXYA', N'D58J2RM39A', N'Value', N'Key值', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1087, N'D58J2RPC0A', N'D58J2RM39A', N'Name', N'顯示內容', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1088, N'D58J2RPTKA', N'D58J2RM39A', N'Sort', N'排序', N'int', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1089, N'D58J2RQ9CA', N'D58J2RM39A', N'Ext', N'擴充資訊', N'varchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1090, N'D58J2RR6RA', N'D58J2RM39A', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1091, N'D58LXL78TA', N'D58LXKZJUA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1092, N'D58LXL7PHA', N'D58LXKZJUA', N'CmsType', N'Cms類別', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1093, N'D58LXL84GA', N'D58LXKZJUA', N'DataType', N'資料型態', N'varchar(10)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1094, N'D58LXL8LJA', N'D58LXKZJUA', N'Title', N'標題', N'nvarchar(255)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1095, N'D58LXL926A', N'D58LXKZJUA', N'Text', N'文字內容', N'nvarchar(-1)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1096, N'D58LXL9JRA', N'D58LXKZJUA', N'Html', N'HTML內容', N'nvarchar(-1)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1097, N'D58LXL9ZYA', N'D58LXKZJUA', N'Note', N'備註', N'nvarchar(255)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1098, N'D58LXLAE4A', N'D58LXKZJUA', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1099, N'D58LXLAWDA', N'D58LXKZJUA', N'StartTime', N'開始時間', N'datetime', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1100, N'D58LXLBBRA', N'D58LXKZJUA', N'EndTime', N'結束時間', N'datetime', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1101, N'D58LXLBS3A', N'D58LXKZJUA', N'Status', N'資料狀態', N'bit', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1102, N'D58LXLC7BA', N'D58LXKZJUA', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1103, N'D58LXLCNPA', N'D58LXKZJUA', N'Created', N'建檔日期', N'datetime', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1104, N'D58LXLD4AA', N'D58LXKZJUA', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1105, N'D58LXLDKHA', N'D58LXKZJUA', N'Revised', N'修改日期', N'datetime', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1106, N'D58LXLE05A', N'D58LXL00BA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1107, N'D58LXLEGNA', N'D58LXL00BA', N'FldText', N'文字欄位', N'nchar(10)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1108, N'D58LXLEXFA', N'D58LXL00BA', N'FldNum', N'整數欄位', N'int', 1, N'', 3, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1109, N'D58LXLFDXA', N'D58LXL00BA', N'FldNum2', N'小數欄位', N'float', 1, N'', 4, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1110, N'D58LXLFVLA', N'D58LXL00BA', N'FldCheck', N'Check欄位', N'bit', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1111, N'D58LXLGATA', N'D58LXL00BA', N'FldRadio', N'Radio欄位', N'tinyint', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1112, N'D58LXLGR2A', N'D58LXL00BA', N'FldSelect', N'下拉式欄位', N'varchar(10)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1113, N'D58LXLH7YA', N'D58LXL00BA', N'FldDate', N'日期欄位', N'date', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1114, N'D58LXLHNJA', N'D58LXL00BA', N'FldDatetime', N'時間欄位', N'datetime', 1, N'', 9, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1115, N'D58LXLJ38A', N'D58LXL00BA', N'FldFile', N'檔案欄位', N'nvarchar(100)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1116, N'D58LXLJJKA', N'D58LXL00BA', N'FldColor', N'Color欄位', N'varchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1117, N'D58LXLJZDA', N'D58LXL00BA', N'FldTextarea', N'多行文字欄位', N'nvarchar(-1)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1118, N'D58LXLKFWA', N'D58LXL00BA', N'FldHtml', N'HTML欄位', N'nvarchar(-1)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1119, N'D58LXLKXXA', N'D58LXL0GHA', N'Type', N'資料類別', N'varchar(20)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1120, N'D58LXLLC9A', N'D58LXL0GHA', N'Value', N'Key值', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1121, N'D58LXLLTNA', N'D58LXL0GHA', N'Name_zhTW', N'名稱(繁中)', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1122, N'D58LXLM8FA', N'D58LXL0GHA', N'Name_zhCN', N'名稱(簡中)', N'nvarchar(30)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1123, N'D58LXLMQTA', N'D58LXL0GHA', N'Name_enUS', N'名稱(英文)', N'nvarchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1124, N'D58LXLN5BA', N'D58LXL0GHA', N'Sort', N'排序', N'int', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1125, N'D58LXLNLEA', N'D58LXL0GHA', N'Ext', N'擴充資訊', N'varchar(30)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1126, N'D58LXLP29A', N'D58LXL0GHA', N'Note', N'備註', N'nvarchar(255)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1127, N'D58LXLPJHA', N'D58LXL0Y0A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1128, N'D58LXLPZMA', N'D58LXL0Y0A', N'Name', N'名稱', N'nvarchar(50)', 0, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1129, N'D58LXLQF2A', N'D58LXL0Y0A', N'TplFile', N'範本檔名', N'nvarchar(100)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1130, N'D58LXLQWKA', N'D58LXL0Y0A', N'ToEmails', N'收件者', N'varchar(500)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1131, N'D58LXLRCUA', N'D58LXL0Y0A', N'Sql', N'SQL內容', N'nvarchar(500)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1132, N'D58LXLRT0A', N'D58LXL0Y0A', N'Status', N'資料狀態', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1133, N'D58LXLS80A', N'D58LXL1D4A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1134, N'D58LXLSQUA', N'D58LXL1D4A', N'Code', N'代碼', N'varchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1135, N'D58LXLT5GA', N'D58LXL1D4A', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1136, N'D58LXLTMCA', N'D58LXL1D4A', N'Portrait', N'是否直立', N'bit', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1137, N'D58LXLU24A', N'D58LXL1D4A', N'Status', N'資料狀態', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1138, N'D58LXLUH6A', N'D58LXL1VTA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1139, N'D58LXLUY9A', N'D58LXL1VTA', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1140, N'D58LXLVE4A', N'D58LXL1VTA', N'StartNode', N'開始節點', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1141, N'D58LXLVVGA', N'D58LXL1VTA', N'EndNode', N'結束節點', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1142, N'D58LXLWA6A', N'D58LXL1VTA', N'CondStr', N'條件字串', N'varchar(255)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1143, N'D58LXLWR6A', N'D58LXL1VTA', N'Sort', N'排序', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1144, N'D58LXLX7DA', N'D58LXL2A8A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1145, N'D58LXLXPBA', N'D58LXL2A8A', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1146, N'D58LXLY5WA', N'D58LXL2A8A', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1147, N'D58LXLYM9A', N'D58LXL2A8A', N'NodeType', N'節點類別', N'char(1)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1148, N'D58LXLZ2TA', N'D58LXL2A8A', N'PosX', N'位置X', N'smallint', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1149, N'D58LXLZHUA', N'D58LXL2A8A', N'PosY', N'位置Y', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1150, N'D58LXLZZFA', N'D58LXL2A8A', N'SignerType', N'簽核者類別', N'varchar(2)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1151, N'D58LXM0F2A', N'D58LXL2A8A', N'SignerValue', N'簽核者值', N'varchar(30)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1152, N'D58LXM0XDA', N'D58LXL2A8A', N'PassType', N'通過類別', N'char(1)', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1153, N'D58LXM1D6A', N'D58LXL2A8A', N'PassNum', N'通過數量', N'smallint', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1154, N'D58LXM1UJA', N'D58LXL2SLA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1155, N'D58LXM2ADA', N'D58LXL2SLA', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1156, N'D58LXM2SWA', N'D58LXL2SLA', N'SourceId', N'來源資料Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1157, N'D58LXM374A', N'D58LXL2SLA', N'NodeName', N'節點名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1158, N'D58LXM3PDA', N'D58LXL2SLA', N'FlowLevel', N'流程Level', N'smallint', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1159, N'D58LXM44MA', N'D58LXL2SLA', N'TotalLevel', N'合計Level', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1160, N'D58LXM4STA', N'D58LXL2SLA', N'SignerId', N'簽核者Id', N'varchar(10)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1161, N'D58LXM51YA', N'D58LXL2SLA', N'SignerName', N'簽核者姓名', N'nvarchar(20)', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1162, N'D58LXM5GQA', N'D58LXL2SLA', N'SignStatus', N'簽核狀態', N'char(1)', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1163, N'D58LXM5YEA', N'D58LXL2SLA', N'SignTime', N'簽核時間', N'datetime', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1164, N'D58LXM6DAA', N'D58LXL2SLA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1165, N'D58LXM6UQA', N'D58LXL378A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1166, N'D58LXM7ABA', N'D58LXL378A', N'Type', N'資料類別', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1167, N'D58LXM7R3A', N'D58LXL378A', N'FileName', N'上傳檔名', N'nvarchar(100)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1168, N'D58LXM861A', N'D58LXL378A', N'OkCount', N'成功筆數', N'smallint', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1169, N'D58LXM8MUA', N'D58LXL378A', N'FailCount', N'失敗筆數', N'smallint', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1170, N'D58LXM93BA', N'D58LXL378A', N'TotalCount', N'合計筆數', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1171, N'D58LXM9J1A', N'D58LXL378A', N'CreatorName', N'建檔人員', N'nvarchar(30)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1172, N'D58LXM9ZEA', N'D58LXL378A', N'Created', N'建檔日期', N'datetime', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1173, N'D58LXMAE9A', N'D58LXL3N4A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1174, N'D58LXMAWMA', N'D58LXL3N4A', N'Code', N'代碼', N'varchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1175, N'D58LXMBB0A', N'D58LXL3N4A', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1176, N'D58LXMBSCA', N'D58LXL3N4A', N'Icon', N'圖示', N'varchar(20)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1177, N'D58LXMC85A', N'D58LXL3N4A', N'Url', N'Url', N'varchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1178, N'D58LXMCQ7A', N'D58LXL3N4A', N'Sort', N'排序', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1179, N'D58LXMD5AA', N'D58LXL3N4A', N'AuthRow', N'資料權限', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1180, N'D58LXMDL8A', N'D58LXL3N4A', N'FunCreate', N'FunCreate', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1181, N'D58LXME1HA', N'D58LXL3N4A', N'FunRead', N'FunRead', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1182, N'D58LXMEGYA', N'D58LXL3N4A', N'FunUpdate', N'FunUpdate', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1183, N'D58LXMEX3A', N'D58LXL3N4A', N'FunDelete', N'FunDelete', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1184, N'D58LXMFD9A', N'D58LXL3N4A', N'FunPrint', N'FunPrint', N'tinyint', 0, N'0', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1185, N'D58LXMFVYA', N'D58LXL3N4A', N'FunExport', N'FunExport', N'tinyint', 0, N'0', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1186, N'D58LXMGAPA', N'D58LXL3N4A', N'FunView', N'FunView', N'tinyint', 0, N'0', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1187, N'D58LXMGRPA', N'D58LXL3N4A', N'FunOther', N'FunOther', N'tinyint', 0, N'0', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1188, N'D58LXMH73A', N'D58LXL44TA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1189, N'D58LXMHPPA', N'D58LXL44TA', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1190, N'D58LXMJ4NA', N'D58LXL4KKA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1191, N'D58LXMJKJA', N'D58LXL4KKA', N'RoleId', N'角色Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1192, N'D58LXMK1QA', N'D58LXL4KKA', N'ProgId', N'功能Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1193, N'D58LXMKHDA', N'D58LXL4KKA', N'FunCreate', N'FunCreate', N'tinyint', 0, N'0', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1194, N'D58LXMKYWA', N'D58LXL4KKA', N'FunRead', N'FunRead', N'tinyint', 0, N'0', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1195, N'D58LXMLD7A', N'D58LXL4KKA', N'FunUpdate', N'FunUpdate', N'tinyint', 0, N'0', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1196, N'D58LXMLUYA', N'D58LXL4KKA', N'FunDelete', N'FunDelete', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1197, N'D58LXMMAHA', N'D58LXL4KKA', N'FunPrint', N'FunPrint', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1198, N'D58LXMMSRA', N'D58LXL4KKA', N'FunExport', N'FunExport', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1199, N'D58LXMN8NA', N'D58LXL4KKA', N'FunView', N'FunView', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1200, N'D58LXMNPHA', N'D58LXL4KKA', N'FunOther', N'FunOther', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1201, N'D58LXMP45A', N'D58LXL50NA', N'Sn', N'序號', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1202, N'D58LXMPLVA', N'D58LXL50NA', N'RowId', N'資料Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1203, N'D58LXMQ1QA', N'D58LXL50NA', N'TableName', N'資料表名稱', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1204, N'D58LXMQG0A', N'D58LXL50NA', N'ColName', N'欄位名稱', N'varchar(30)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1205, N'D58LXMQYKA', N'D58LXL50NA', N'OldValue', N'舊值', N'nvarchar(500)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1206, N'D58LXMRE7A', N'D58LXL50NA', N'NewValue', N'新值', N'nvarchar(500)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1207, N'D58LXMRVJA', N'D58LXL50NA', N'Act', N'執行動作', N'varchar(10)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1208, N'D58LXMSB0A', N'D58LXL50NA', N'Created', N'建檔日期', N'datetime', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1209, N'D58LXMSSCA', N'D58LXL5FUA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1210, N'D58LXMT79A', N'D58LXL5FUA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1211, N'D58LXMTNNA', N'D58LXL5FUA', N'RoleId', N'角色Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1212, N'D58WX65UJA', N'D58WX60WVA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 1, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1213, N'D58WX66AAA', N'D58WX60WVA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1214, N'D58WX66RHA', N'D58WX60WVA', N'Created', N'建檔日期', N'datetime', 0, N'', 3, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1215, N'D58WX677AA', N'D58WX61CCA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1216, N'D58WX67N5A', N'D58WX61CCA', N'Name', N'尋寶名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1217, N'D58WX683EA', N'D58WX61CCA', N'StartTime', N'開始時間', N'datetime', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1218, N'D58WX68JCA', N'D58WX61CCA', N'EndTime', N'結束時間', N'datetime', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1219, N'D58WX68ZGA', N'D58WX61CCA', N'IsBatch', N'是否批次解謎', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1220, N'D58WX69E7A', N'D58WX61CCA', N'IsMove', N'是否移動地點', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1221, N'D58WX6ABUA', N'D58WX61CCA', N'GiftName', N'獎品內容', N'nvarchar(100)', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1222, N'D58WX6ATUA', N'D58WX61CCA', N'Note', N'注意事項', N'nvarchar(500)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1223, N'D58WX6C6SA', N'D58WX61CCA', N'LaunchStatus', N'上架狀態', N'char(1)', 0, N'''0''', 11, N'refer XpCode.LaunchStatus', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1224, N'D58WX6CNVA', N'D58WX61CCA', N'Status', N'資料狀態', N'bit', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1225, N'D58WX6D3LA', N'D58WX61CCA', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1226, N'D58WX6E0GA', N'D58WX61TFA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1227, N'D58WX6EFQA', N'D58WX61TFA', N'CmsType', N'CMS種類', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1228, N'D58WX6EWHA', N'D58WX61TFA', N'Title', N'標題', N'nvarchar(255)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1229, N'D58WX6FC1A', N'D58WX61TFA', N'Text', N'文字內容', N'nvarchar(-1)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1230, N'D58WX6FT1A', N'D58WX61TFA', N'Html', N'Html內容', N'nvarchar(-1)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1231, N'D58WX6G8UA', N'D58WX61TFA', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1232, N'D58WX6GPJA', N'D58WX61TFA', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1233, N'D58WX6H4WA', N'D58WX61TFA', N'StartTime', N'開始時間', N'datetime', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1234, N'D58WX6HL3A', N'D58WX61TFA', N'EndTime', N'結束時間', N'datetime', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1235, N'D58WX6J13A', N'D58WX61TFA', N'Status', N'資料狀態', N'bit', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1236, N'D58WX6JHKA', N'D58WX61TFA', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1237, N'D58WX6JZ4A', N'D58WX61TFA', N'Created', N'建檔日期', N'datetime', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1238, N'D58WX6KEGA', N'D58WX61TFA', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1239, N'D58WX6KVNA', N'D58WX61TFA', N'Revised', N'修改日期', N'datetime', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1240, N'D58WX6LB5A', N'D58WX627KA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1241, N'D58WX6LSHA', N'D58WX627KA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1242, N'D58WX6M70A', N'D58WX627KA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 3, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1243, N'D58WX6MNHA', N'D58WX627KA', N'Reply', N'答題內容', N'nvarchar(500)', 0, N'', 4, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1244, N'D58WX6N48A', N'D58WX627KA', N'Created', N'建檔日期', N'datetime', 0, N'', 5, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1245, N'D58WX6NKEA', N'D58WX62PGA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1246, N'D58WX6P1NA', N'D58WX62PGA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1247, N'D58WX6PHDA', N'D58WX62PGA', N'FileName', N'上傳檔案名稱', N'nvarchar(100)', 0, N'', 3, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1248, N'D58WX6PZDA', N'D58WX62PGA', N'Hint', N'提示', N'nvarchar(100)', 1, N'', 4, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1249, N'D58WX6QEEA', N'D58WX62PGA', N'Answer', N'正確答案', N'varchar(22)', 0, N'', 5, N'MD5加密', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1250, N'D58WX6QWGA', N'D58WX62PGA', N'Sort', N'排序', N'smallint', 0, N'', 6, N'', 0)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1251, N'D58WX6RBPA', N'D58WX634WA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1252, N'D58WX6RT8A', N'D58WX634WA', N'Name', N'姓名', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1253, N'D58WX6S9UA', N'D58WX634WA', N'Account', N'帳號', N'varchar(20)', 0, N'', 3, N'可修改', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1254, N'D58WX6SRJA', N'D58WX634WA', N'Pwd', N'密碼', N'varchar(22)', 0, N'''''', 4, N'MD5加密', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1255, N'D58WX6T64A', N'D58WX634WA', N'Status', N'資料狀態', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1256, N'D58WX6TMNA', N'D58WX634WA', N'IsAdmin', N'是否管理者', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1257, N'D58WX6U3JA', N'D58WX63L5A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1258, N'D58WX6UKQA', N'D58WX63L5A', N'Name', N'姓名', N'nvarchar(30)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1259, N'D58WX6V0WA', N'D58WX63L5A', N'Phone', N'手機號碼', N'varchar(15)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1260, N'D58WX6VFNA', N'D58WX63L5A', N'Email', N'Email', N'varchar(100)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1261, N'D58WX6VXLA', N'D58WX63L5A', N'Address', N'地址', N'nvarchar(255)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1262, N'D58WX6WCUA', N'D58WX63L5A', N'Created', N'建檔日期', N'datetime', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1263, N'D58WX6WUUA', N'D58WX63L5A', N'Revised', N'修改日期', N'datetime', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1264, N'D58WX6XA1A', N'D58WX6485A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1265, N'D58WX6XRPA', N'D58WX6485A', N'Name', N'姓名', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1266, N'D58WX6Y7NA', N'D58WX6485A', N'Account', N'帳號', N'varchar(30)', 0, N'', 3, N'可修改', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1267, N'D58WX6YNSA', N'D58WX6485A', N'Pwd', N'密碼', N'varchar(22)', 0, N'''''', 4, N'MD5加密', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1268, N'D58WX6Z41A', N'D58WX6485A', N'Phone', N'手機號碼', N'varchar(15)', 0, N'', 5, N'不可修改', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1269, N'D58WX6ZKCA', N'D58WX6485A', N'Email', N'Email', N'varchar(100)', 0, N'', 6, N'不可修改', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1270, N'D58WX70B0A', N'D58WX6485A', N'Address', N'地址', N'nvarchar(255)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1271, N'D58WX70X9A', N'D58WX6485A', N'IsCorp', N'是否公司', N'bit', 0, N'', 8, N'公司才能設定Bao.IsMove=true', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1272, N'D58WX71C0A', N'D58WX6485A', N'Created', N'建檔日期', N'datetime', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1273, N'D70XCQLA3A', N'D58LXL00BA', N'FldInt', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1274, N'D70XCQLSCA', N'D58LXL00BA', N'FldDec', N'', N'float', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1275, N'D70XCQM7TA', N'D58LXL00BA', N'FldDt', N'', N'datetime', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1276, N'D8ZRXEVPDA', N'D58WX61CCA', N'StageCount', N'關卡數目', N'tinyint', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1277, N'D8ZRXEW46A', N'D58WX61CCA', N'Revised', N'異動日期', N'datetime', 0, N'', 14, N'含建檔日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1278, N'D8ZRXEWK8A', N'D8ZRXETU8A', N'UserId', N'App用戶Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1279, N'D8ZRXEX1RA', N'D8ZRXETU8A', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1280, N'D8ZRXEXHBA', N'D8ZRXETU8A', N'AttendStatus', N'參加狀態', N'char(1)', 0, N'', 3, N'refer XpCode AttendStatus', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1281, N'D8ZRXEXY2A', N'D8ZRXETU8A', N'Created', N'建檔日期', N'datetime', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1282, N'D8ZRXEYE4A', N'D8ZRXEUAEA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1283, N'D8ZRXEYVPA', N'D8ZRXEUAEA', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1284, N'D8ZRXEZB3A', N'D8ZRXEUAEA', N'UserId', N'App用戶Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1285, N'D8ZRXEZTXA', N'D8ZRXEUAEA', N'Reply', N'答題內容', N'nvarchar(500)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1286, N'D8ZRXF08SA', N'D8ZRXEUAEA', N'Created', N'建檔日期', N'datetime', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1287, N'D8ZRXF0Q4A', N'D8ZRXEUS7A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1288, N'D8ZRXF163A', N'D8ZRXEUS7A', N'BaoId', N'尋寶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1289, N'D8ZRXF1LKA', N'D8ZRXEUS7A', N'FileName', N'上傳檔案名稱', N'nvarchar(100)', 0, N'', 3, N'關卡圖檔', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1290, N'D8ZRXF21QA', N'D8ZRXEUS7A', N'AppHint', N'App用戶提示', N'nvarchar(100)', 1, N'', 4, N'顯示在App', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1291, N'D8ZRXF2GXA', N'D8ZRXEUS7A', N'CustHint', N'客戶提示', N'nvarchar(100)', 1, N'', 5, N'for 客戶維護用途', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1292, N'D8ZRXF2YXA', N'D8ZRXEUS7A', N'Answer', N'正確答案', N'varchar(22)', 0, N'', 6, N'MD5加密', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1293, N'D8ZRXF3D4A', N'D8ZRXEUS7A', N'Sort', N'排序', N'smallint', 0, N'', 7, N'base 0', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1294, N'D8ZRXF3V7A', N'D58WX63L5A', N'Status', N'資料狀態', N'bit', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1295, N'D8ZRXF4ARA', N'D58WX6485A', N'Status', N'資料狀態', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1296, N'D9QS7Q771A', N'D58WX61CCA', N'IsMoney', N'是否獎金', N'bit', 0, N'', 7, N'0(獎品), 1(獎金)', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1297, N'D9QS7Q7NDA', N'D8ZRXETU8A', N'NowLevel', N'目前關卡', N'smallint', 0, N'1', 4, N'base 1', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1298, N'D9QS7Q84SA', N'D58WX63L5A', N'AuthCode', N'認證號碼', N'varchar(10)', 1, N'', 6, N'App用戶建立帳號或是回復帳號時, 必須經過認證', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1299, N'D9QTSQG2QA', N'D9QTSQF55A', N'Type', N'資料類別', N'varchar(20)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1300, N'D9QTSQGHUA', N'D9QTSQF55A', N'Value', N'Key值', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1301, N'D9QTSQGYWA', N'D9QTSQF55A', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1302, N'D9QTSQHD9A', N'D9QTSQF55A', N'Sort', N'排序', N'int', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1303, N'D9QTSQHVPA', N'D9QTSQF55A', N'Ext', N'擴充資訊', N'varchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (1304, N'D9QTSQJAGA', N'D9QTSQF55A', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10783, N'HyCqhKLbUj', N'5X9RB36MYA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10784, N'9AR644Rz1S', N'5X9RB36TCA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10785, N'xlwhgmLoCe', N'5X9RB36VLA', N'AutoIdLen', N'', N'varchar(20)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10786, N'IOQCjWJb0Z', N'5X9RB36XEA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10787, N'QzwcThaFgg', N'5X9RB36ZCA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10788, N'gSsqhBBNL1', N'oOG6kwUBcT', N'Sn', N'', N'nchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10789, N'lrxkoVuL9N', N'oOG6kwUBcT', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10790, N'qH3wMFow2l', N'oOG6kwUBcT', N'ProgId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10791, N'toPiQ9D3zx', N'oOG6kwUBcT', N'OwnerId', N'', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10792, N'08XKCcU7cs', N'oOG6kwUBcT', N'Title', N'', N'nvarchar(255)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10793, N'GgRiWW7KxW', N'oOG6kwUBcT', N'IssueType', N'', N'char(1)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10794, N'e4y7hfjkGv', N'oOG6kwUBcT', N'Note', N'', N'nvarchar(1000)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10795, N'T8nJiW3G0b', N'oOG6kwUBcT', N'Creator', N'', N'varchar(10)', 0, N'', 8, N'建檔人員', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10796, N'exN2k1hrQS', N'oOG6kwUBcT', N'Created', N'', N'datetime', 0, N'', 9, N'建檔日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10797, N'oKTK9qHW1J', N'oOG6kwUBcT', N'Reviser', N'', N'varchar(10)', 1, N'', 10, N'修改人員', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10798, N'O6vOCd8tj5', N'oOG6kwUBcT', N'Revised', N'', N'datetime', 1, N'', 11, N'修改日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10799, N'3bxDGkBCZY', N'iskfQCWWld', N'm22_systype', N'', N'char(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10800, N'rlrYaj45J6', N'iskfQCWWld', N'm22_versions', N'', N'char(4)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10801, N'JvoosGki6V', N'iskfQCWWld', N'm22_table', N'', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10802, N'Avm9fYMkxF', N'iskfQCWWld', N'm22_colid', N'', N'varchar(3)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10803, N'MZs4jm52yf', N'iskfQCWWld', N'm22_column', N'', N'varchar(30)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10804, N'g1HOgnBpzx', N'iskfQCWWld', N'm22_typestat', N'', N'decimal', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10805, N'ejRjKRBNLI', N'iskfQCWWld', N'm22_length', N'', N'decimal', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10806, N'sGokeTlxNW', N'iskfQCWWld', N'm22_scale', N'', N'decimal', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10807, N'oUc1GEbhuU', N'iskfQCWWld', N'm22_isnullable', N'', N'char(1)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10808, N'fwMY0Nhlag', N'iskfQCWWld', N'm22_colname', N'', N'varchar(255)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10809, N'AbIrdDLuLB', N'iskfQCWWld', N'm22_meno', N'', N'varchar(255)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10810, N'f4wptDg1eb', N'iskfQCWWld', N'm22_pkey', N'', N'decimal', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10811, N'D7J66mIkm9', N'iskfQCWWld', N'm22_indexkey1', N'', N'decimal', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10812, N'Ku7YSfNE0n', N'iskfQCWWld', N'm22_indexkey2', N'', N'decimal', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10813, N'NSh8Ss9F5i', N'iskfQCWWld', N'm22_indexkey3', N'', N'decimal', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10814, N'Ot6xBDxoBf', N'iskfQCWWld', N'm22_indexkey4', N'', N'decimal', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10815, N'AsQAuiPxDs', N'iskfQCWWld', N'm22_indexkey5', N'', N'decimal', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10816, N'BN6r4Pb9PC', N'iskfQCWWld', N'm22_indexkey6', N'', N'decimal', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10817, N'9EX7Xx1Nqi', N'iskfQCWWld', N'm22_indexkey7', N'', N'decimal', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10818, N'NphSJrbbuR', N'iskfQCWWld', N'm22_indexkey8', N'', N'decimal', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10819, N'LRxUV3Qwd3', N'iskfQCWWld', N'm22_indexkey9', N'', N'decimal', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10820, N'BiwhJa33e0', N'iskfQCWWld', N'm22_upduserno', N'', N'varchar(8)', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10821, N'KjrlED2QLf', N'iskfQCWWld', N'm22_upddatetime', N'', N'varchar(14)', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10822, N'eJKuTG8uOY', N'AHODXbOs21', N'm21_systype', N'', N'char(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10823, N'o1DWJJNKmG', N'AHODXbOs21', N'm21_versions', N'', N'char(4)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10824, N'2SOHKjAZBM', N'AHODXbOs21', N'm21_table', N'', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10825, N'Y2StCUcz9r', N'AHODXbOs21', N'm21_tablename', N'', N'varchar(100)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10826, N'gvKEQFKS5e', N'AHODXbOs21', N'm21_columnnum', N'', N'decimal', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10827, N'rAyi3KjD39', N'AHODXbOs21', N'm21_dbversions', N'', N'char(4)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10828, N'oVNM6Ziwqt', N'AHODXbOs21', N'm21_meno', N'', N'varchar(200)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10829, N'cuhC71YBtK', N'AHODXbOs21', N'm21_tablealias', N'', N'varchar(5)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10830, N'ZutK44lksH', N'AHODXbOs21', N'm21_pflag', N'', N'char(1)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10831, N'1GTOgjPE1n', N'AHODXbOs21', N'm21_upduserno', N'', N'varchar(8)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10832, N'sZfyTOyWkV', N'AHODXbOs21', N'm21_upddatetime', N'', N'varchar(14)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10833, N'Kbwcf8gZM0', N'AHODXbOs21', N'm21_filegroup', N'', N'char(1)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10834, N'QKG8Dfcmxv', N'5X9RB3720A', N'DbType', N'', N'tinyint', 0, N'0', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10835, N'uM8PSQnwmR', N'5X9RB3720A', N'FromTmpTable', N'', N'bit', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10836, N'lIRnWZcuyI', N'5X9RB3720A', N'Creator', N'', N'varchar(10)', 1, N'', 10, N'建檔人員', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10837, N'GH2txWoKm6', N'5X9RB3720A', N'Created', N'', N'datetime', 1, N'', 11, N'建檔日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10838, N'vze34BzNyw', N'5X9RB3720A', N'Reviser', N'', N'varchar(10)', 1, N'', 12, N'修改人員', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10839, N'HGcoSy3FdW', N'5X9RB3720A', N'Revised', N'', N'datetime', 1, N'', 13, N'修改日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10840, N'n8NvDUKgVT', N'5X9RB373ZA', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10841, N'8D6tWswj5e', N'GP5KoCoFVL', N'Code', N'', N'varchar(100)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10842, N'J4svJ3fZlT', N'GP5KoCoFVL', N'TableCode', N'', N'varchar(100)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10843, N'KoUzYTR1lp', N'GP5KoCoFVL', N'DataType', N'', N'varchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10844, N'G8s9MBFpYi', N'GP5KoCoFVL', N'Nullable', N'', N'bit', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10845, N'XWzO6tJPia', N'GP5KoCoFVL', N'DefaultValue', N'', N'varchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10846, N'Ce8kwQEOMO', N'GP5KoCoFVL', N'Sort', N'', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10847, N'v54MuHrODL', N'GP5KoCoFVL', N'Note', N'', N'nvarchar(100)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10848, N'4V1GWztYUv', N'6QsXKBAf4h', N'Code', N'', N'varchar(100)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10849, N'p6Cwls4mtd', N'6QsXKBAf4h', N'Note', N'', N'nvarchar(255)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10850, N'aHaXg9X3Ux', N'bnZnlLytAh', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10851, N'C8g5CUaxe7', N'bnZnlLytAh', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10852, N'GsM5X5adXE', N'bnZnlLytAh', N'MgrId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10853, N'8Gw3dMor04', N'6hxO6mna5B', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10854, N'xEIxDrli5J', N'6hxO6mna5B', N'Code', N'', N'varchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10855, N'uOKadavWpB', N'6hxO6mna5B', N'Name', N'', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10856, N'iRRKbpJcQv', N'6hxO6mna5B', N'Icon', N'', N'varchar(20)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10857, N'vlNHBneoiB', N'6hxO6mna5B', N'Url', N'', N'varchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10858, N'g3lZK8uuHt', N'6hxO6mna5B', N'Sort', N'', N'smallint', 0, N'9', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10859, N'fVlRZvOXIQ', N'6hxO6mna5B', N'AuthRow', N'', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10860, N'Ig7VX8m3KE', N'6hxO6mna5B', N'FunCreate', N'', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10861, N'xdspdF3Oe3', N'6hxO6mna5B', N'FunRead', N'', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10862, N'lP8afLkoQH', N'6hxO6mna5B', N'FunUpdate', N'', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10863, N'MUuYU3usp1', N'6hxO6mna5B', N'FunDelete', N'', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10864, N'dOSqPc0UVi', N'6hxO6mna5B', N'FunPrint', N'', N'tinyint', 0, N'0', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10865, N'Jkux9AtINc', N'6hxO6mna5B', N'FunExport', N'', N'tinyint', 0, N'0', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10866, N'1MNMFh8mnb', N'6hxO6mna5B', N'FunView', N'', N'tinyint', 0, N'0', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10867, N'7241lG9UDV', N'6hxO6mna5B', N'FunOther', N'', N'tinyint', 0, N'0', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10868, N'4Q0wH0vWXQ', N'Shc53pKlhR', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10869, N'Cs65YLD9wj', N'Shc53pKlhR', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10870, N'iJ7os8NlSY', N'RGGtEcyABd', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10871, N'KPpWPw4PKG', N'RGGtEcyABd', N'RoleId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10872, N'xEEthhSVn9', N'RGGtEcyABd', N'ProgId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10873, N'AOj6ekGnsp', N'RGGtEcyABd', N'FunCreate', N'', N'tinyint', 0, N'0', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10874, N'vkwS6lHeQL', N'RGGtEcyABd', N'FunRead', N'', N'tinyint', 0, N'0', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10875, N'L6FTnNuI7L', N'RGGtEcyABd', N'FunUpdate', N'', N'tinyint', 0, N'0', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10876, N'Q5RWHg5yaq', N'RGGtEcyABd', N'FunDelete', N'', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10877, N'KFHPTGolU3', N'RGGtEcyABd', N'FunPrint', N'', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10878, N'IRn6QsvpCr', N'RGGtEcyABd', N'FunExport', N'', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10879, N'ZSmB0GA0zs', N'RGGtEcyABd', N'FunView', N'', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10880, N'8IKS2nwuNB', N'RGGtEcyABd', N'FunOther', N'', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10881, N'TxjRo2r9SD', N'N28UZ1M3aY', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10882, N'xunplxahua', N'N28UZ1M3aY', N'Name', N'', N'nvarchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10883, N'wIDSJpGldh', N'N28UZ1M3aY', N'Account', N'', N'varchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10884, N'Lp3WkaapwF', N'N28UZ1M3aY', N'Pwd', N'', N'varchar(32)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10885, N'nwLMlxSauQ', N'N28UZ1M3aY', N'DeptId', N'', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10886, N'vnfPmns73t', N'N28UZ1M3aY', N'Status', N'', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10887, N'CtN9mVn1WJ', N'e6HaNyL2vi', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10888, N'Ompxjv7SzW', N'e6HaNyL2vi', N'UserId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10889, N'R8UbVjrbbI', N'e6HaNyL2vi', N'RoleId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10890, N'HMDffuFGit', N'3DgSQnx0Wz', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10891, N'OcKm24vGQc', N'3DgSQnx0Wz', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10892, N'1Qe0r0bz7X', N'3DgSQnx0Wz', N'ProjectId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10893, N'9prI7l2STu', N'3DgSQnx0Wz', N'Sort', N'', N'smallint', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10894, N'TYMsC4v2p9', N'3DgSQnx0Wz', N'Status', N'', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10895, N'ujlGI3q6n0', N'5X9RB3720A', N'Name', N'', N'nvarchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10896, N'Lou30ZC23n', N'mOOH7SiWrZ', N'Sn', N'Sn', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10897, N'lYbisE0naG', N'mOOH7SiWrZ', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10898, N'tein3BWe00', N'mOOH7SiWrZ', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10899, N'Ku325lVSq4', N'mOOH7SiWrZ', N'Gender', N'性別種類', N'char(1)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10900, N'n1shEKha5h', N'mOOH7SiWrZ', N'Photo1', N'圖檔1', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10901, N'viAEJIEDhv', N'mOOH7SiWrZ', N'Photo2', N'圖檔2', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10902, N'NWebwpAFa7', N'mOOH7SiWrZ', N'Photo3', N'圖檔3', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10903, N'noajKgDKgP', N'mOOH7SiWrZ', N'ClothType', N'服飾種類', N'char(1)', 0, N'', 8, N'服飾類別, see XpCode.Type=Clot', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10904, N'EAxeJUrdVX', N'mOOH7SiWrZ', N'SizeType', N'尺寸', N'char(1)', 0, N'', 9, N'尺寸類別, see XpCode.Type=Size', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10905, N'33Pv2i9K4n', N'mOOH7SiWrZ', N'StyleType', N'風格', N'char(1)', 0, N'', 10, N'款式, see XpCode.Type=StyleTyp', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10906, N'vXM77MAKLw', N'mOOH7SiWrZ', N'Color', N'顏色', N'nvarchar(20)', 0, N'', 11, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10907, N'Fa6CYCrbDJ', N'mOOH7SiWrZ', N'Material', N'材質', N'nvarchar(30)', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10908, N'EHI77eiJ4H', N'mOOH7SiWrZ', N'Price', N'售價', N'decimal', 0, N'0', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10909, N'oR2hF5EcFy', N'mOOH7SiWrZ', N'ListTime', N'上架時間', N'datetime', 1, N'', 14, N'上架時間', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10910, N'xVN3OdGm3y', N'mOOH7SiWrZ', N'ClothStatus', N'資料狀態', N'char(10)', 0, N'', 15, N'資料狀態, see XpCode.Type=Clot', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10911, N'9y7F7BdNcx', N'mOOH7SiWrZ', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10912, N'UoG8ixXkRB', N'mOOH7SiWrZ', N'Created', N'建檔時間', N'datetime', 0, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10913, N'LTV8VBhGg6', N'mOOH7SiWrZ', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10914, N'ZTiiSAMDgv', N'mOOH7SiWrZ', N'Revised', N'修改時間', N'datetime', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10915, N'h6muTNY3YL', N'Pcc3x8gEUv', N'Sn', N'Sn', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10916, N'6EG4W334t6', N'Pcc3x8gEUv', N'Id', N'Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10917, N'qv2DexyWNk', N'Pcc3x8gEUv', N'Title', N'標題', N'nvarchar(255)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10918, N'PpZK5J0tmW', N'Pcc3x8gEUv', N'ProjectId', N'專案', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10919, N'jJd4xs2rOw', N'Pcc3x8gEUv', N'RptUserId', N'回報人員', N'varchar(10)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10920, N'eiHtMj6Wq2', N'Pcc3x8gEUv', N'OwnerId', N'處理人員', N'varchar(10)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10921, N'QFfPVWt5tG', N'Pcc3x8gEUv', N'IssueType', N'問題類別', N'varchar(5)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10922, N'iFzpUbR2YH', N'Pcc3x8gEUv', N'WorkHours', N'工時', N'smallint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10923, N'bAU9GVpXi5', N'Pcc3x8gEUv', N'Note', N'說明', N'nvarchar(1000)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10924, N'Av4GzYn1vy', N'Pcc3x8gEUv', N'ToVer', N'寫入版本', N'varchar(10)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10925, N'KJXFy7pnwX', N'Pcc3x8gEUv', N'IsFirst', N'優先處理', N'bit', 0, N'', 11, N'是否優先處理', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10926, N'QwetdFqI3t', N'Pcc3x8gEUv', N'IsFinish', N'已結案', N'bit', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10927, N'pniKH6welO', N'Pcc3x8gEUv', N'Status', N'狀態', N'bit', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10928, N'TVphTLdHaH', N'Pcc3x8gEUv', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 14, N'建檔人員', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10929, N'hDne7MLwaz', N'Pcc3x8gEUv', N'Created', N'建檔日期', N'datetime', 0, N'', 15, N'建檔日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10930, N'NGC3FFHF5n', N'Pcc3x8gEUv', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 16, N'修改人員', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10931, N'fSgRhH7qVi', N'Pcc3x8gEUv', N'Revised', N'修改日期', N'datetime', 1, N'', 17, N'修改日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10932, N'KK96EZS2NB', N'H3IpNo6Q9a', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10933, N'r3c1R1cjh4', N'H3IpNo6Q9a', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10934, N'PQmvwtHf5b', N'H3IpNo6Q9a', N'IssueId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10935, N'Qd68lFeyrx', N'H3IpNo6Q9a', N'FileName', N'', N'nvarchar(100)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10936, N'fsEDlMNGxw', N'H3IpNo6Q9a', N'Creator', N'', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10937, N'KH0hQSLNps', N'H3IpNo6Q9a', N'Created', N'', N'datetime', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10938, N'OgIAyHEXtY', N'5m3eGKDETO', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10939, N'i17PvVdTSI', N'5m3eGKDETO', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10940, N'nXO2vCXc8i', N'5m3eGKDETO', N'IssueId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10941, N'g48NgrtuD8', N'5m3eGKDETO', N'Title', N'', N'nvarchar(255)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10942, N'Gbulh2YFCG', N'5m3eGKDETO', N'ToUserId', N'', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10943, N'iPau1P5jsG', N'5m3eGKDETO', N'Creator', N'', N'varchar(10)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10944, N'y7l4m2DsxT', N'5m3eGKDETO', N'Created', N'', N'datetime', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10945, N'F4QaWxq0f2', N'ihhoHxJYXM', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10946, N'dF49BVGV9p', N'ihhoHxJYXM', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10947, N'L1lbnOMb3L', N'ihhoHxJYXM', N'IssueId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10948, N'gCerKs3crL', N'ihhoHxJYXM', N'SourceIssue', N'', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10949, N'hcdr5jfGSB', N'ihhoHxJYXM', N'Creator', N'', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10950, N'ZmIu2F0jlZ', N'ihhoHxJYXM', N'Created', N'', N'datetime', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10951, N'01qE7dCm6k', N'9jDLL5XdNI', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10952, N'l21Uxqq6V9', N'9jDLL5XdNI', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10953, N'5DUPG0DObA', N'9jDLL5XdNI', N'IssueId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10954, N'1lqGF3kY7C', N'9jDLL5XdNI', N'WatcherId', N'', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10955, N'PQQFQs5sEl', N'R66qCuquX5', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10956, N'zgluqOosUA', N'R66qCuquX5', N'Name', N'專案名稱', N'nvarchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10962, N'906Gmnbdnt', N'R66qCuquX5', N'Status', N'啟用', N'bit', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10964, N'3lLtHWcb4r', N'R66qCuquX5', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 4, N'建檔人員', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10965, N'l36hSvikQO', N'R66qCuquX5', N'Created', N'建檔日期', N'datetime', 0, N'', 5, N'建檔日期', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10968, N'm69vtwt4c3', N'ue994CB7lh', N'Type', N'', N'varchar(20)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10969, N'qNahowgM9Q', N'ue994CB7lh', N'Value', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10970, N'HRcwQThD9w', N'ue994CB7lh', N'Name', N'', N'nvarchar(100)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10971, N'wnvyl7EZA4', N'ue994CB7lh', N'Sort', N'', N'int', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10972, N'nudkJHH4vL', N'ue994CB7lh', N'Ext', N'', N'varchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10973, N'7qrP4pmnqu', N'ue994CB7lh', N'Note', N'', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10974, N'vET9Emrizi', N'sHFc93GsbC', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10975, N'gtY5z8qMNt', N'sHFc93GsbC', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10976, N'5qaaKhZj8q', N'sHFc93GsbC', N'MgrId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10977, N'3BQCCtPTEL', N'XP8rQb5IVa', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10978, N'CJOycmThlB', N'XP8rQb5IVa', N'Code', N'', N'varchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10979, N'IHfl0I3R9U', N'XP8rQb5IVa', N'Name', N'', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10980, N'af2gf8IhMB', N'XP8rQb5IVa', N'Icon', N'', N'varchar(20)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10981, N'BRA0VsC7qe', N'XP8rQb5IVa', N'Url', N'', N'varchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10982, N'MOddriwZFj', N'XP8rQb5IVa', N'Sort', N'', N'smallint', 0, N'9', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10983, N'T7EsZ1TJvt', N'XP8rQb5IVa', N'AuthRow', N'', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10984, N'xw4NQdp8kJ', N'XP8rQb5IVa', N'FunCreate', N'', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10985, N'1nqLDOdRdr', N'XP8rQb5IVa', N'FunRead', N'', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10986, N'8hgAm9paKb', N'XP8rQb5IVa', N'FunUpdate', N'', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10987, N'mwHruYiz5F', N'XP8rQb5IVa', N'FunDelete', N'', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10988, N'i9K7TbphRd', N'XP8rQb5IVa', N'FunPrint', N'', N'tinyint', 0, N'0', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10989, N'kMGj3i0gGB', N'XP8rQb5IVa', N'FunExport', N'', N'tinyint', 0, N'0', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10990, N'dCaGyaT7pB', N'XP8rQb5IVa', N'FunView', N'', N'tinyint', 0, N'0', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10991, N'G8RYD2hGKo', N'XP8rQb5IVa', N'FunOther', N'', N'tinyint', 0, N'0', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10992, N'XakZ5IDRro', N'D5DeJBgqBy', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10993, N'8JvckhGsp4', N'D5DeJBgqBy', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10994, N'yLFRYcwcbj', N'uT3lzL86wk', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10995, N'y3b99K3Teb', N'uT3lzL86wk', N'RoleId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10996, N'PGZwEqEO54', N'uT3lzL86wk', N'ProgId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10997, N'ewghZ6b9z4', N'uT3lzL86wk', N'FunCreate', N'', N'tinyint', 0, N'0', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10998, N'5QM2AjR1hF', N'uT3lzL86wk', N'FunRead', N'', N'tinyint', 0, N'0', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (10999, N'pumWdMQ6Dc', N'uT3lzL86wk', N'FunUpdate', N'', N'tinyint', 0, N'0', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11000, N'OOwZEJEcCc', N'uT3lzL86wk', N'FunDelete', N'', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11001, N'ZSLQeMHMk5', N'uT3lzL86wk', N'FunPrint', N'', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11002, N'qJWVc3yRxl', N'uT3lzL86wk', N'FunExport', N'', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11003, N'bn3gUIfey9', N'uT3lzL86wk', N'FunView', N'', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11004, N'zoAiGXs1ZU', N'uT3lzL86wk', N'FunOther', N'', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11005, N'ANh6NghyH7', N'FR1KXdGRMJ', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11006, N'1uuHKjpNYN', N'FR1KXdGRMJ', N'Name', N'', N'nvarchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11007, N'mpNF2KKImm', N'FR1KXdGRMJ', N'Account', N'', N'varchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11008, N'WnuNibGBa9', N'FR1KXdGRMJ', N'Pwd', N'', N'varchar(32)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11009, N's9FOltdYmP', N'FR1KXdGRMJ', N'DeptId', N'', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11010, N'CNNqdigJQa', N'FR1KXdGRMJ', N'PhotoFile', N'', N'nvarchar(100)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11011, N'UwZP5rRoRK', N'FR1KXdGRMJ', N'Status', N'', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11012, N'8dNYLQrvjy', N'nOP9DDusSI', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11013, N'tFFnCrngpo', N'nOP9DDusSI', N'UserId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11014, N'QPuEpfitE0', N'nOP9DDusSI', N'RoleId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11783, N'd15DkxLJAe', N'ocpdrXTqbK', N'CALENDAR1SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11784, N'rbIzwlH7Nd', N'ocpdrXTqbK', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11785, N'n8YP65MIES', N'ocpdrXTqbK', N'TITLE', N'', N'nvarchar(200)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11786, N'06bRZfOEB7', N'ocpdrXTqbK', N'CONTENT', N'', N'ntext(1073741823)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11787, N'KtiBOGQdQv', N'ocpdrXTqbK', N'DATE1', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11788, N'OyoeQM3e9F', N'ocpdrXTqbK', N'TIME_START', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11789, N'8E1qp9ZGxz', N'ocpdrXTqbK', N'TIME_END', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11790, N's6tENhtjVF', N'LSU6e0qkpX', N'HISTORY_CASE_SN', N'', N'int', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11791, N'WqubYrBbE3', N'LSU6e0qkpX', N'LOGIN_NAME', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11792, N'eY68TNntjt', N'LSU6e0qkpX', N'CASE_ID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11793, N'S0QcE9XUX7', N'LSU6e0qkpX', N'PROJECT_SN', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11794, N'2m1BEan1lc', N'LSU6e0qkpX', N'START_DATE', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11795, N'EcqAb9c91E', N'LSU6e0qkpX', N'CLOSE_DATE', N'', N'smalldatetime', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11796, N'R4TRHlH0II', N'51BP4254Mp', N'CASE0SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11797, N'2odtV5qnHs', N'51BP4254Mp', N'Pid', N'', N'nvarchar(255)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11798, N'n6g0Tw1jkU', N'51BP4254Mp', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11799, N'qQMO7TaDql', N'51BP4254Mp', N'NAME', N'', N'nvarchar(255)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11800, N'5SlU3Ywpz1', N'51BP4254Mp', N'NICKNAME', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11801, N'7dUjyXjzcI', N'51BP4254Mp', N'Birthday', N'', N'smalldatetime', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11802, N'h7TBkTpHps', N'51BP4254Mp', N'SEX', N'', N'nvarchar(255)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11803, N'vvrUEEdvYH', N'51BP4254Mp', N'RegisterZip', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11804, N'95bIEGu4ds', N'51BP4254Mp', N'RegisterCity', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11805, N'0XIK7jx8jE', N'51BP4254Mp', N'RegisterAddress', N'', N'nvarchar(255)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11806, N'Zi98jp2yAr', N'51BP4254Mp', N'RegisterArea', N'', N'nvarchar(50)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11807, N'WNa9t0XANQ', N'51BP4254Mp', N'CommunicationZip', N'', N'nvarchar(50)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11808, N'KnkPH6c885', N'51BP4254Mp', N'CommunicationCity', N'', N'nvarchar(50)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11809, N'wAwztdnMZX', N'51BP4254Mp', N'CommunicationAddress', N'', N'nvarchar(50)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11810, N'OR0nwgnzuo', N'51BP4254Mp', N'CommunicationArea', N'', N'nvarchar(255)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11811, N'vPEftDgokI', N'51BP4254Mp', N'Name_rec', N'', N'nvarchar(50)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11812, N'EbMmy9qdhG', N'51BP4254Mp', N'PhoneAreacode_rec', N'', N'nvarchar(50)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11813, N'75ipSJ5mGj', N'51BP4254Mp', N'Phone_rec', N'', N'nvarchar(50)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11814, N'OOFOILnXqr', N'51BP4254Mp', N'LivingAttribute', N'', N'nvarchar(255)', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11815, N'3LapfY5rPS', N'51BP4254Mp', N'PhoneDayAreacode', N'', N'nvarchar(50)', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11816, N'n25vWHXwU6', N'51BP4254Mp', N'PhoneDay', N'', N'nvarchar(50)', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11817, N'm1suMuHKf1', N'51BP4254Mp', N'PhoneDayExt', N'', N'nvarchar(50)', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11818, N'5vFQ4367vX', N'51BP4254Mp', N'PhoneNightAreacode', N'', N'nvarchar(50)', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11819, N'EiYtxHO70E', N'51BP4254Mp', N'PhoneNight', N'', N'nvarchar(50)', 1, N'', 24, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11820, N'5Z75LYWI0a', N'51BP4254Mp', N'MobilPhone', N'', N'nvarchar(50)', 1, N'', 25, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11821, N'2d1KY0XCLE', N'51BP4254Mp', N'Fax', N'', N'nvarchar(50)', 1, N'', 26, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11822, N'i72lfSa8gz', N'51BP4254Mp', N'Email', N'', N'nvarchar(100)', 1, N'', 27, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11823, N'3ip4tBIdNW', N'51BP4254Mp', N'EducationLevel', N'', N'nvarchar(255)', 1, N'', 28, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11824, N'OlAAKaSf2N', N'51BP4254Mp', N'DisableLicense', N'', N'nvarchar(255)', 1, N'', 29, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11825, N'MG1NESyxnP', N'51BP4254Mp', N'DisableLicense1', N'', N'nvarchar(255)', 1, N'', 30, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11826, N'd7glbabvUN', N'51BP4254Mp', N'Height', N'', N'nvarchar(255)', 1, N'', 31, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11827, N'QQXXTHlB0l', N'51BP4254Mp', N'Weight', N'', N'nvarchar(255)', 1, N'', 32, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11828, N'TceKSGipNP', N'51BP4254Mp', N'SightLeft', N'', N'nvarchar(255)', 1, N'', 33, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11829, N'7RdKlsfatj', N'51BP4254Mp', N'SightRight', N'', N'nvarchar(255)', 1, N'', 34, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11830, N'2oeaLamifD', N'51BP4254Mp', N'ColorBlindness', N'', N'nvarchar(255)', 1, N'', 35, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11831, N'6rkOw0mWjX', N'51BP4254Mp', N'HearingLeft', N'', N'nvarchar(255)', 1, N'', 36, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11832, N'lB1gi93NCq', N'51BP4254Mp', N'HearingRight', N'', N'nvarchar(255)', 1, N'', 37, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11833, N'7qefehEttT', N'51BP4254Mp', N'Intelligence', N'', N'nvarchar(255)', 1, N'', 38, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11834, N'qbMuA6TqdO', N'51BP4254Mp', N'DisableClass', N'', N'nvarchar(255)', 1, N'', 39, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11835, N'9d5qDpF6lt', N'51BP4254Mp', N'DisableClass_other', N'', N'nvarchar(255)', 1, N'', 40, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11836, N'adLobglfk7', N'51BP4254Mp', N'DisableLevel', N'', N'nvarchar(255)', 1, N'', 41, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11837, N'rhMjxUqeiR', N'51BP4254Mp', N'DisableTime', N'', N'nvarchar(255)', 1, N'', 42, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11838, N'jzyulpav26', N'51BP4254Mp', N'DisableReason', N'', N'nvarchar(255)', 1, N'', 43, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11839, N'Q97bF2aemj', N'51BP4254Mp', N'DisablePosition', N'', N'nvarchar(255)', 1, N'', 44, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11840, N'JpD91W6OUJ', N'51BP4254Mp', N'DisableCurrentStatus', N'', N'nvarchar(255)', 1, N'', 45, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11841, N'7VWclSvc8a', N'51BP4254Mp', N'OtherDisable', N'', N'nvarchar(255)', 1, N'', 46, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11842, N'tOCb3uhiGO', N'51BP4254Mp', N'Health', N'', N'nvarchar(255)', 1, N'', 47, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11843, N'aiKClgZ80s', N'51BP4254Mp', N'SickName', N'', N'nvarchar(255)', 1, N'', 48, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11844, N'pP5uemcdwz', N'51BP4254Mp', N'MedicationName', N'', N'nvarchar(255)', 1, N'', 49, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11845, N'LfTCeYTK29', N'51BP4254Mp', N'MedicationMethod', N'', N'nvarchar(255)', 1, N'', 50, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11846, N'9vd5fSfyNT', N'51BP4254Mp', N'MedicationOverSensitive', N'', N'nvarchar(255)', 1, N'', 51, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11847, N'fSgeaYjS4T', N'51BP4254Mp', N'Livingperson', N'', N'nvarchar(255)', 1, N'', 52, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11848, N'jBxn9FnSN4', N'51BP4254Mp', N'FamilyCondition', N'', N'nvarchar(255)', 1, N'', 53, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11849, N'F0evRXfAu6', N'51BP4254Mp', N'ParentName', N'', N'nvarchar(50)', 1, N'', 54, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11850, N'cNaYtKUDJi', N'51BP4254Mp', N'ParentRelation', N'', N'nvarchar(50)', 1, N'', 55, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11851, N'k1NT0GmCqf', N'51BP4254Mp', N'ParentPID', N'', N'nvarchar(50)', 1, N'', 56, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11852, N'dH2FRVBRx6', N'51BP4254Mp', N'Parentbirthday', N'', N'smalldatetime', 1, N'', 57, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11853, N'LSFEnrJPWW', N'51BP4254Mp', N'ParentSEX', N'', N'nvarchar(50)', 1, N'', 58, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11854, N'5vach5VHUf', N'51BP4254Mp', N'Parentjob', N'', N'nvarchar(50)', 1, N'', 59, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11855, N'rQm3rvXt0G', N'51BP4254Mp', N'ParentZip', N'', N'nvarchar(50)', 1, N'', 60, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11856, N'9AQb6wVpUJ', N'51BP4254Mp', N'ParentCity', N'', N'nvarchar(50)', 1, N'', 61, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11857, N'NWWz7VmpRV', N'51BP4254Mp', N'ParentAddress', N'', N'nvarchar(255)', 1, N'', 62, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11858, N'8QIHXHH60L', N'51BP4254Mp', N'ParentArea', N'', N'nvarchar(50)', 1, N'', 63, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11859, N'BdMuwD6r4J', N'51BP4254Mp', N'ParentPhoneDayAreacode', N'', N'nvarchar(50)', 1, N'', 64, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11860, N'yvWtyzCpwN', N'51BP4254Mp', N'ParentPhoneDay', N'', N'nvarchar(50)', 1, N'', 65, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11861, N'VpysR6qVuq', N'51BP4254Mp', N'ParentPhoneDayExt', N'', N'nvarchar(50)', 1, N'', 66, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11862, N'vGVy0WVKdT', N'51BP4254Mp', N'ParentPhoneNightAreacode', N'', N'nvarchar(50)', 1, N'', 67, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11863, N'TPy5UcF2sd', N'51BP4254Mp', N'ParentPhoneNight', N'', N'nvarchar(50)', 1, N'', 68, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11864, N'ZYbsSqm0F4', N'51BP4254Mp', N'ParentMobilPhone', N'', N'nvarchar(50)', 1, N'', 69, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11865, N'5eJqEppOfL', N'51BP4254Mp', N'AgentName', N'', N'nvarchar(50)', 1, N'', 70, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11866, N'jlxK9o8PGI', N'51BP4254Mp', N'AgentRelation', N'', N'nvarchar(50)', 1, N'', 71, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11867, N'iE0EryJ3sg', N'51BP4254Mp', N'AgentPhoneDayAreacode', N'', N'nvarchar(50)', 1, N'', 72, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11868, N'UZ1u4vRZHb', N'51BP4254Mp', N'AgentPhoneDay', N'', N'nvarchar(50)', 1, N'', 73, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11869, N'ssTJclkkua', N'51BP4254Mp', N'AgentPhoneDayExt', N'', N'nvarchar(50)', 1, N'', 74, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11870, N'HFG3mL2aZp', N'51BP4254Mp', N'AgentPhoneNightAreacode', N'', N'nvarchar(50)', 1, N'', 75, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11871, N'8hwh8XHXUL', N'51BP4254Mp', N'AgentPhoneNight', N'', N'nvarchar(50)', 1, N'', 76, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11872, N'WVOFRE2wce', N'51BP4254Mp', N'AgentZip', N'', N'nvarchar(50)', 1, N'', 77, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11873, N'GvrbmEun3r', N'51BP4254Mp', N'AgentCity', N'', N'nvarchar(50)', 1, N'', 78, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11874, N'6uL1GObpDW', N'51BP4254Mp', N'AgentAddress', N'', N'nvarchar(255)', 1, N'', 79, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11875, N'Lx62kzoG10', N'51BP4254Mp', N'AgentArea', N'', N'nvarchar(50)', 1, N'', 80, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11876, N'rqY8ScpEGV', N'51BP4254Mp', N'MainContactName', N'', N'nvarchar(50)', 1, N'', 81, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11877, N'JaT8UimM3m', N'51BP4254Mp', N'MainContactRelation', N'', N'nvarchar(50)', 1, N'', 82, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11878, N'1B3BcpOHxR', N'51BP4254Mp', N'MainContactPhoneDayAreacode', N'', N'nvarchar(50)', 1, N'', 83, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11879, N'9pp1XKnURc', N'51BP4254Mp', N'MainContactPhoneDay', N'', N'nvarchar(50)', 1, N'', 84, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11880, N'kQid4QP3k2', N'51BP4254Mp', N'MainContactDayExt', N'', N'nvarchar(50)', 1, N'', 85, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11881, N'fvaRdsOT32', N'51BP4254Mp', N'MainContactPhoneNightAreacode', N'', N'nvarchar(50)', 1, N'', 86, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11882, N'gvoCLVC0qZ', N'51BP4254Mp', N'MainContactPhoneNight', N'', N'nvarchar(50)', 1, N'', 87, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11883, N'wUo2Pvp4Wa', N'51BP4254Mp', N'MainContactZip', N'', N'nvarchar(50)', 1, N'', 88, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11884, N'UA7oXsdnAM', N'51BP4254Mp', N'MainContactCity', N'', N'nvarchar(50)', 1, N'', 89, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11885, N'F2Wic7R0pg', N'51BP4254Mp', N'MainContactAddress', N'', N'nvarchar(255)', 1, N'', 90, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11886, N'5Re4bYSSmq', N'51BP4254Mp', N'MainContactArea', N'', N'nvarchar(50)', 1, N'', 91, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11887, N'jWmV5IpTeb', N'51BP4254Mp', N'ContactName', N'', N'nvarchar(50)', 1, N'', 92, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11888, N'sVhbBABB0a', N'51BP4254Mp', N'ContactRelation', N'', N'nvarchar(50)', 1, N'', 93, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11889, N'Jw2SHSMV6L', N'51BP4254Mp', N'ContactPhoneDayAreacode', N'', N'nvarchar(50)', 1, N'', 94, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11890, N'GbAWvpPe53', N'51BP4254Mp', N'ContactPhoneDay', N'', N'nvarchar(50)', 1, N'', 95, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11891, N'fACcah6YMB', N'51BP4254Mp', N'ContactDayExt', N'', N'nvarchar(50)', 1, N'', 96, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11892, N'xpusvCtsQz', N'51BP4254Mp', N'ContactPhoneNightAreacode', N'', N'nvarchar(50)', 1, N'', 97, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11893, N'pH9OpBzHhT', N'51BP4254Mp', N'ContactPhoneNight', N'', N'nvarchar(50)', 1, N'', 98, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11894, N'z5e1qXegXz', N'51BP4254Mp', N'ContactZip', N'', N'nvarchar(50)', 1, N'', 99, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11895, N'HnhhiqXLTT', N'51BP4254Mp', N'ContactCity', N'', N'nvarchar(50)', 1, N'', 100, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11896, N'DfB8pp6SMq', N'51BP4254Mp', N'ContactAddress', N'', N'nvarchar(255)', 1, N'', 101, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11897, N'VoyGfe4J29', N'51BP4254Mp', N'ContactArea', N'', N'nvarchar(50)', 1, N'', 102, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11898, N'fP1rwXrPmr', N'51BP4254Mp', N'REMEM', N'', N'nvarchar(255)', 1, N'', 103, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11899, N'BaepCRuyST', N'51BP4254Mp', N'DATE_B', N'', N'datetime', 1, N'', 104, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11900, N'5nbft11OJl', N'51BP4254Mp', N'Photofile', N'', N'nvarchar(50)', 1, N'', 105, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11901, N'bUMPotvZMV', N'51BP4254Mp', N'familytreefile', N'', N'nvarchar(50)', 1, N'', 106, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11902, N'7EZ6Oo0jUN', N'51BP4254Mp', N'IsDonationList', N'', N'nvarchar(10)', 1, N'', 107, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11903, N'dVoNsHXWya', N'51BP4254Mp', N'IsDonationListFile', N'', N'nvarchar(255)', 1, N'', 108, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11904, N'Cp6sloE96h', N'51BP4254Mp', N'CASE_CLOSE', N'', N'nvarchar(10)', 1, N'', 109, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11905, N'598iiImA0x', N'51BP4254Mp', N'CASE_CLOSE_REASON', N'', N'nvarchar(50)', 1, N'', 110, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11906, N'Sja9Eh3kUg', N'51BP4254Mp', N'case_close_reason_Other', N'', N'nvarchar(255)', 1, N'', 111, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11907, N'4cg4jKZzUh', N'51BP4254Mp', N'DeposName', N'', N'nvarchar(50)', 1, N'', 112, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11908, N'dBRIvg9Eyw', N'51BP4254Mp', N'AccountId', N'', N'nvarchar(50)', 1, N'', 113, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11909, N'9NA7HkuScj', N'51BP4254Mp', N'BranchCode', N'', N'nvarchar(50)', 1, N'', 114, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11910, N'70szbMATTT', N'51BP4254Mp', N'AccountCode', N'', N'nvarchar(50)', 1, N'', 115, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11911, N'hOsdk6NqEL', N'51BP4254Mp', N'description', N'', N'nvarchar(2000)', 1, N'', 116, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11912, N'mPRL5kT9yr', N'51BP4254Mp', N'結案原因', N'', N'nvarchar(50)', 1, N'', 117, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11913, N'893quJ324q', N'51BP4254Mp', N'T_TC_ID', N'', N'nvarchar(50)', 1, N'', 118, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11914, N'0GS4SHwKb9', N'51BP4254Mp', N'T_SK_ID', N'', N'nvarchar(50)', 1, N'', 119, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11915, N'WQeysvOBld', N'51BP4254Mp', N'caseOpenDate', N'', N'datetime', 1, N'', 120, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11916, N'g8dn6yKzVf', N'51BP4254Mp', N'DATE_CLOSE', N'', N'datetime', 1, N'', 121, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11917, N'dI7KIo3pxQ', N'51BP4254Mp', N'insDT', N'', N'smalldatetime', 1, N'', 122, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11918, N'UhJdDMSWxU', N'pYIb7dhTyD', N'CASE0SN', N'', N'int', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11919, N'lndNPxh5Dv', N'pYIb7dhTyD', N'家庭人口數', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11920, N'XToFmqneVQ', N'pYIb7dhTyD', N'每月平均薪資', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11921, N'YrXP8iQiTK', N'pYIb7dhTyD', N'資源連結', N'', N'nvarchar(10)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11922, N'Qc4pTviCv4', N'pYIb7dhTyD', N'無資源連結說明', N'', N'nvarchar(300)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11923, N'HgvWANHcqm', N'pYIb7dhTyD', N'有資源連結說明', N'', N'nvarchar(300)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11924, N'Ztyuly3hcP', N'pYIb7dhTyD', N'公私部門補助', N'', N'int', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11925, N'JCGMjrFY5Q', N'pYIb7dhTyD', N'退休金', N'', N'int', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11926, N'SPCajNE3pS', N'pYIb7dhTyD', N'房租收入', N'', N'int', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11927, N'bwP9YfHLbS', N'pYIb7dhTyD', N'營業收入', N'', N'int', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11928, N'M1BE2DYSgr', N'pYIb7dhTyD', N'其他基本收入', N'', N'int', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11929, N'g4BK51SmIw', N'pYIb7dhTyD', N'每月基本收入備註', N'', N'nvarchar(300)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11930, N'y00D9mH1D2', N'pYIb7dhTyD', N'急難救助金', N'', N'int', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11931, N'7UXMTbfYhP', N'pYIb7dhTyD', N'保險給付', N'', N'int', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11932, N'OhyclysK9Q', N'pYIb7dhTyD', N'中獎', N'', N'int', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11933, N'CzNgMepjfU', N'pYIb7dhTyD', N'其他不定期收入', N'', N'int', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11934, N'zehpI40ooS', N'pYIb7dhTyD', N'不定期收入備註', N'', N'nvarchar(300)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11935, N'm8onWJro1o', N'pYIb7dhTyD', N'投資', N'', N'int', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11936, N'eTYkHWETW2', N'pYIb7dhTyD', N'資產', N'', N'int', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11937, N'z6sqDLqt2w', N'pYIb7dhTyD', N'不動產', N'', N'int', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11938, N'lJSPRIGYCq', N'pYIb7dhTyD', N'其他收入備註', N'', N'nvarchar(300)', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11939, N'S6ID0OEllc', N'pYIb7dhTyD', N'食', N'', N'int', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11940, N'4oTwVO64rg', N'pYIb7dhTyD', N'衣', N'', N'int', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11941, N'4yzqw9VFtD', N'pYIb7dhTyD', N'住', N'', N'int', 1, N'', 24, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11942, N'gRTL4W7lr6', N'pYIb7dhTyD', N'行', N'', N'int', 1, N'', 25, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11943, N'NnCIDSQcjH', N'pYIb7dhTyD', N'育', N'', N'int', 1, N'', 26, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11944, N'UYQXFWsDRG', N'pYIb7dhTyD', N'樂', N'', N'int', 1, N'', 27, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11945, N'htFqEpKjJF', N'pYIb7dhTyD', N'每月基本支出其他', N'', N'int', 1, N'', 28, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11946, N'V2oGngeKdb', N'pYIb7dhTyD', N'每月基本支出備註', N'', N'nvarchar(300)', 1, N'', 29, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11947, N'uIxzIRERdx', N'pYIb7dhTyD', N'大於等於小於', N'', N'nvarchar(50)', 1, N'', 30, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11948, N'ruSNIai37a', N'pYIb7dhTyD', N'北高省', N'', N'nvarchar(50)', 1, N'', 31, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11949, N'1LWs2SMpKD', N'pYIb7dhTyD', N'台北市金額', N'', N'int', 1, N'', 32, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11950, N'0fkXxikeBU', N'pYIb7dhTyD', N'高雄市金額', N'', N'int', 1, N'', 33, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11951, N'AFkjJIX3em', N'pYIb7dhTyD', N'台灣省金額', N'', N'int', 1, N'', 34, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11952, N'2uMfO3Gyz3', N'pYIb7dhTyD', N'台北市人', N'', N'int', 1, N'', 35, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11953, N'ZrXgliLycs', N'pYIb7dhTyD', N'高雄市人', N'', N'int', 1, N'', 36, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11954, N'a0HOxyMCH3', N'pYIb7dhTyD', N'台灣省人', N'', N'int', 1, N'', 37, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11955, N'EbVYi3qsAO', N'pYIb7dhTyD', N'醫療費用', N'', N'int', 1, N'', 38, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11956, N'uhCL26afVS', N'pYIb7dhTyD', N'貸款', N'', N'int', 1, N'', 39, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11957, N'ksvBnY6XBd', N'pYIb7dhTyD', N'非一般性保費支出', N'', N'int', 1, N'', 40, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11958, N'BBK5daDnLO', N'pYIb7dhTyD', N'特殊支出備註', N'', N'nvarchar(150)', 1, N'', 41, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11959, N'LjQVXk06GZ', N'pYIb7dhTyD', N'其他支出', N'', N'int', 1, N'', 42, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11960, N'FdsL5sQUy9', N'pYIb7dhTyD', N'評估結果', N'', N'nvarchar(300)', 1, N'', 43, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11961, N'VP71pOuZV8', N'pYIb7dhTyD', N'申請民間補助金額', N'', N'int', 1, N'', 44, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11962, N'4d8PVzZeG0', N'pYIb7dhTyD', N'支持日期起', N'', N'smalldatetime', 1, N'', 45, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11963, N'UAAygmmnqr', N'pYIb7dhTyD', N'支持日期迄', N'', N'smalldatetime', 1, N'', 46, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11964, N'A68sggLKB5', N'pYIb7dhTyD', N'補助方式', N'', N'nvarchar(50)', 1, N'', 47, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11965, N'jNYzKGsNbQ', N'pYIb7dhTyD', N'補助方式_支持金', N'', N'int', 1, N'', 48, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11966, N'vGLPj4sEcS', N'pYIb7dhTyD', N'補助方式_實物', N'', N'nvarchar(200)', 1, N'', 49, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11967, N'zUrLaHTmdi', N'pYIb7dhTyD', N'補助方式_其他', N'', N'nvarchar(200)', 1, N'', 50, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11968, N'ObEO5sw4DV', N'pYIb7dhTyD', N'社工員評估意見', N'', N'nvarchar(2000)', 1, N'', 51, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11969, N'PBHOIJwZQ9', N'pYIb7dhTyD', N'主管批示', N'', N'nvarchar(2000)', 1, N'', 52, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11970, N'Vf6kMxi5ut', N'HmlSCO5k17', N'CASE0_NOWSN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11971, N'ghri1KYCiC', N'HmlSCO5k17', N'CASE0SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11972, N'nwuh74G6L2', N'HmlSCO5k17', N'CASE0_NOW', N'', N'ntext(1073741823)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11973, N'3c2cOetqOK', N'HmlSCO5k17', N'CASE0_THANKS', N'', N'ntext(1073741823)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11974, N'lndscN12WL', N'HmlSCO5k17', N'DATE_B', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11975, N'Mn9FZ5zkog', N'QRdZqE5Kvy', N'CASE0SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11976, N'pjiFRu4NAY', N'QRdZqE5Kvy', N'NAME', N'', N'nvarchar(255)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11977, N'uKnpBgjfx6', N'QRdZqE5Kvy', N'Pid', N'', N'nvarchar(255)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11978, N'U596hh97iK', N'QRdZqE5Kvy', N'Birthday', N'', N'smalldatetime', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11979, N'WITxs3zQK1', N'QRdZqE5Kvy', N'NAMEID', N'', N'nvarchar(10)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11980, N'vHswuPp7fb', N'QRdZqE5Kvy', N'Expr1', N'', N'nvarchar(10)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11981, N'BglmXSEFio', N'QRdZqE5Kvy', N'BIRTH', N'', N'nvarchar(8)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11982, N'BtS5x4F2du', N'QRdZqE5Kvy', N'ID', N'', N'nvarchar(10)', 1, N'', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11983, N'hLxsQYOCFW', N'HEMsb8qp7C', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11984, N'1UhVr9aWDT', N'HEMsb8qp7C', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11985, N'RInRMCdXFj', N'HEMsb8qp7C', N'Sort', N'', N'int', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11986, N'vZNVHOWVG0', N'fcYGEaKGPm', N'NAMEID', N'', N'nvarchar(10)', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11987, N'TIk2v40Xsk', N'fcYGEaKGPm', N'NAME', N'', N'nvarchar(10)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11988, N'uYFDgEZgCl', N'fcYGEaKGPm', N'ADATE', N'', N'nvarchar(8)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11989, N'2hrVZA7czp', N'fcYGEaKGPm', N'BIRTH', N'', N'nvarchar(8)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11990, N'I0aE0RFu0Y', N'fcYGEaKGPm', N'SEX', N'', N'nvarchar(1)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11991, N'KvyawZNdpg', N'fcYGEaKGPm', N'ID', N'', N'nvarchar(10)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11992, N'Mur08JzeYb', N'fcYGEaKGPm', N'ID1', N'', N'nvarchar(10)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11993, N'luUsMu2uhm', N'fcYGEaKGPm', N'BNAME', N'', N'nvarchar(10)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11994, N'nDts8iilGw', N'fcYGEaKGPm', N'BANKNO', N'', N'nvarchar(14)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11995, N'tITQfQ6HLj', N'fcYGEaKGPm', N'VC01', N'', N'nvarchar(4)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11996, N'q67uoGJHHO', N'fcYGEaKGPm', N'VC02', N'', N'nvarchar(4)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11997, N'fznLQNY8l5', N'fcYGEaKGPm', N'HID', N'', N'nvarchar(10)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11998, N'vI51RPOO28', N'fcYGEaKGPm', N'VC06', N'', N'nvarchar(4)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (11999, N'7eFYomgo8y', N'fcYGEaKGPm', N'VC03', N'', N'nvarchar(4)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12000, N'XpHQWwzW6c', N'fcYGEaKGPm', N'VC04', N'', N'nvarchar(4)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12001, N'4CVm8OgK2Y', N'fcYGEaKGPm', N'CNO', N'', N'nvarchar(13)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12002, N'v7uDhOhFdm', N'fcYGEaKGPm', N'ADDRESS', N'', N'nvarchar(60)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12003, N'BtOoHCZPGC', N'fcYGEaKGPm', N'ADRTP', N'', N'nvarchar(1)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12004, N'90N6TKqwjm', N'fcYGEaKGPm', N'PRNT', N'', N'nvarchar(10)', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12005, N'XGnuLH42eN', N'fcYGEaKGPm', N'PBIRTH', N'', N'nvarchar(8)', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12006, N'MeD9EHx35a', N'fcYGEaKGPm', N'PSEX', N'', N'nvarchar(1)', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12007, N'YahWjCPv6a', N'fcYGEaKGPm', N'PID', N'', N'nvarchar(10)', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12008, N'F3bj2shq8K', N'fcYGEaKGPm', N'PADD1', N'', N'nvarchar(60)', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12009, N'JDbdQmEmyr', N'fcYGEaKGPm', N'PADD2', N'', N'nvarchar(60)', 1, N'', 24, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12010, N'iccd6CSnAp', N'fcYGEaKGPm', N'SADD', N'', N'nvarchar(60)', 1, N'', 25, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12011, N'fldf7DVFpJ', N'fcYGEaKGPm', N'RMAN', N'', N'nvarchar(8)', 1, N'', 26, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12012, N'wMM6slh0BE', N'fcYGEaKGPm', N'RTEL', N'', N'nvarchar(20)', 1, N'', 27, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12013, N'w2RCmpvB5a', N'fcYGEaKGPm', N'VC05', N'', N'nvarchar(4)', 1, N'', 28, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12014, N'LWfssBts8o', N'fcYGEaKGPm', N'TEL', N'', N'nvarchar(30)', 1, N'', 29, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12015, N'yAn1C6rQP7', N'fcYGEaKGPm', N'SKRS', N'', N'ntext(1073741823)', 1, N'', 30, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12016, N'dJ5MzZ6eDJ', N'fcYGEaKGPm', N'SKPR', N'', N'ntext(1073741823)', 1, N'', 31, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12017, N'vU79QyOy5b', N'fcYGEaKGPm', N'SWKNM', N'', N'nvarchar(10)', 1, N'', 32, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12018, N'XgKtfZf55Q', N'fcYGEaKGPm', N'SWK', N'', N'nvarchar(8)', 1, N'', 33, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12019, N'koYDzZsMy1', N'fcYGEaKGPm', N'W_NO', N'', N'nvarchar(4)', 1, N'', 34, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12020, N'urzNBLjH7e', N'fcYGEaKGPm', N'REMEM', N'', N'nvarchar(60)', 1, N'', 35, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12021, N'ffvMvZVKZN', N'fcYGEaKGPm', N'DESC', N'', N'ntext(1073741823)', 1, N'', 36, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12022, N'2zk5Og7UFe', N'fcYGEaKGPm', N'FML1', N'', N'ntext(1073741823)', 1, N'', 37, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12023, N'CeDBOu4JIr', N'fcYGEaKGPm', N'FML11', N'', N'nvarchar(88)', 1, N'', 38, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12024, N'2c5ltN5l4A', N'fcYGEaKGPm', N'FML2', N'', N'ntext(1073741823)', 1, N'', 39, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12025, N'VbtgPNStld', N'fcYGEaKGPm', N'FML21', N'', N'nvarchar(88)', 1, N'', 40, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12026, N'4Yno85LEOS', N'fcYGEaKGPm', N'FML3', N'', N'ntext(1073741823)', 1, N'', 41, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12027, N'weU31pjgcf', N'fcYGEaKGPm', N'FML4', N'', N'ntext(1073741823)', 1, N'', 42, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12028, N'I7nmhkF6bg', N'RfiydF785T', N'NAMEID', N'', N'nvarchar(10)', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12029, N'hLByrdWvtq', N'RfiydF785T', N'NAME', N'', N'nvarchar(10)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12030, N'Ok0hsYATeo', N'RfiydF785T', N'ADATE', N'', N'nvarchar(8)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12031, N'CBdRkaSfCt', N'RfiydF785T', N'BIRTH', N'', N'nvarchar(8)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12032, N'IptR5L8beD', N'RfiydF785T', N'SEX', N'', N'nvarchar(1)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12033, N'CS8ypxM7zl', N'RfiydF785T', N'ID', N'', N'nvarchar(10)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12034, N'DV2cdaNaoZ', N'RfiydF785T', N'ID1', N'', N'nvarchar(10)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12035, N'Ac87Ncyxqi', N'RfiydF785T', N'BNAME', N'', N'nvarchar(10)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12036, N'X17J02JUAU', N'RfiydF785T', N'BANKNO', N'', N'nvarchar(14)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12037, N'sTWoENh8tV', N'RfiydF785T', N'VC01', N'', N'nvarchar(4)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12038, N'vrzjXcLjxu', N'RfiydF785T', N'VC02', N'', N'nvarchar(4)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12039, N'7XZoqxx7jB', N'RfiydF785T', N'HID', N'', N'nvarchar(10)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12040, N'cDpl9HrS9A', N'RfiydF785T', N'VC06', N'', N'nvarchar(4)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12041, N'dUECvaF0cL', N'RfiydF785T', N'VC03', N'', N'nvarchar(4)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12042, N'n14JIzSKUC', N'RfiydF785T', N'VC04', N'', N'nvarchar(4)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12043, N'AkweTVyMO7', N'RfiydF785T', N'CNO', N'', N'nvarchar(13)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12044, N'FmcnBuQ6to', N'RfiydF785T', N'ADDRESS', N'', N'nvarchar(60)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12045, N'X9psq4WDbP', N'RfiydF785T', N'ADRTP', N'', N'nvarchar(1)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12046, N'DP0VhmnKzr', N'RfiydF785T', N'PRNT', N'', N'nvarchar(10)', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12047, N'uXp6QXWUlU', N'RfiydF785T', N'PBIRTH', N'', N'nvarchar(8)', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12048, N'Myenu6FlsD', N'RfiydF785T', N'PSEX', N'', N'nvarchar(1)', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12049, N'IJnNJsYf3G', N'RfiydF785T', N'PID', N'', N'nvarchar(10)', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12050, N'ZnYB0lMNuT', N'RfiydF785T', N'PADD1', N'', N'nvarchar(60)', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12051, N'TBa6UR4FVY', N'RfiydF785T', N'PADD2', N'', N'nvarchar(60)', 1, N'', 24, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12052, N'58Yw3C5ukX', N'RfiydF785T', N'SADD', N'', N'nvarchar(60)', 1, N'', 25, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12053, N'UF6A3Ermju', N'RfiydF785T', N'RMAN', N'', N'nvarchar(8)', 1, N'', 26, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12054, N'pHczlaODMc', N'RfiydF785T', N'RTEL', N'', N'nvarchar(20)', 1, N'', 27, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12055, N'eKKjyPbytb', N'RfiydF785T', N'VC05', N'', N'nvarchar(4)', 1, N'', 28, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12056, N'BOv6VgzYlM', N'RfiydF785T', N'TEL', N'', N'nvarchar(30)', 1, N'', 29, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12057, N'dEwBjus1qZ', N'RfiydF785T', N'SKRS', N'', N'ntext(1073741823)', 1, N'', 30, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12058, N'2Ia2uzxpJt', N'RfiydF785T', N'SKPR', N'', N'ntext(1073741823)', 1, N'', 31, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12059, N's1B5rWp9rw', N'RfiydF785T', N'SWKNM', N'', N'nvarchar(10)', 1, N'', 32, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12060, N'PbkocjmUX1', N'RfiydF785T', N'SWK', N'', N'nvarchar(8)', 1, N'', 33, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12061, N'10JK91qcng', N'RfiydF785T', N'W_NO', N'', N'nvarchar(4)', 1, N'', 34, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12062, N'Zt7F0ls16C', N'RfiydF785T', N'REMEM', N'', N'nvarchar(60)', 1, N'', 35, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12063, N'kBUT2pcx6p', N'RfiydF785T', N'DESC', N'', N'ntext(1073741823)', 1, N'', 36, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12064, N's4GWogXaj3', N'RfiydF785T', N'FML1', N'', N'ntext(1073741823)', 1, N'', 37, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12065, N'R17Jr5zqxm', N'RfiydF785T', N'FML11', N'', N'nvarchar(88)', 1, N'', 38, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12066, N'ZYySUOSA1e', N'RfiydF785T', N'FML2', N'', N'ntext(1073741823)', 1, N'', 39, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12067, N'jtE9E88FWk', N'RfiydF785T', N'FML21', N'', N'nvarchar(88)', 1, N'', 40, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12068, N'3mbdFkKKjl', N'RfiydF785T', N'FML3', N'', N'ntext(1073741823)', 1, N'', 41, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12069, N'Mvi3pHM291', N'RfiydF785T', N'FML4', N'', N'ntext(1073741823)', 1, N'', 42, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12070, N'H6taCWWrmr', N'i6P1R9ZOn5', N'出貨SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12071, N'Vfa4YGNRur', N'2CbHeFZzR0', N'DUTY1SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12072, N'ukC6I6ubMP', N'2CbHeFZzR0', N'PROJECT', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12073, N'J8rZjL22iU', N'2CbHeFZzR0', N'DUTY1', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12074, N'0kCRuE8wgo', N'2CbHeFZzR0', N'RIGHT1', N'', N'ntext(1073741823)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12075, N'Y8FsCqCX8c', N'2CbHeFZzR0', N'MEMO1', N'', N'ntext(1073741823)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12076, N'CSfWlY4Yn9', N'2CbHeFZzR0', N'ORDER1', N'', N'int', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12077, N'HVNgiyqvtZ', N'vxi5p90t18', N'INTERVENTION_APPLY_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12078, N'CSvV3b7du0', N'vxi5p90t18', N'補助申請SN', N'', N'int', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12079, N'T8rYTdKzes', N'vxi5p90t18', N'PID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12080, N'1PwGRkxuKh', N'vxi5p90t18', N'NAME', N'', N'nvarchar(255)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12081, N'N51nQMUg03', N'vxi5p90t18', N'總需求口數', N'', N'int', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12082, N'pWjpQ5FOi4', N'vxi5p90t18', N'補助時間起', N'', N'datetime', 1, N'', 6, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12083, N'z5kINHHWPC', N'vxi5p90t18', N'補助時間迄', N'', N'datetime', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12084, N'1ZOBQZH5m5', N'vxi5p90t18', N'縣市', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12085, N'M1UaoKtqkx', N'vxi5p90t18', N'T_SK_ID', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12086, N'P0dnz4KEL9', N'00Zz2Svt6c', N'INTERVENTION_RESULT_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12087, N'bl4EfzFoVl', N'00Zz2Svt6c', N'身份證字號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12088, N'QyRciaOYWF', N'00Zz2Svt6c', N'姓名', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12089, N'Rua7x9VJsS', N'00Zz2Svt6c', N'建立日期', N'', N'smalldatetime', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12090, N'Qg0omcQdFM', N'00Zz2Svt6c', N'補助申請SN', N'', N'int', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12091, N'VAeDtweehd', N'00Zz2Svt6c', N'卡或信', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12092, N'zaBpB8Dtnd', N'00Zz2Svt6c', N'愛心園丁編號', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12093, N'8Z9YuHZM6V', N'00Zz2Svt6c', N'愛心園丁姓名', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12094, N'mNALp7NKP9', N'00Zz2Svt6c', N'愛心園丁城市鄉鎮', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12095, N'vZFmnKvNLF', N'00Zz2Svt6c', N'愛心園丁地址', N'', N'nvarchar(255)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12096, N'PLOXlUrDSB', N'00Zz2Svt6c', N'愛心園丁郵遞區號', N'', N'nvarchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12097, N'u8oF531obZ', N'00Zz2Svt6c', N'愛心園丁電話', N'', N'nvarchar(50)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12098, N'ZTlyRgok3G', N'00Zz2Svt6c', N'愛心園丁補助數', N'', N'int', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12099, N'ofF40yHxFu', N'00Zz2Svt6c', N'配對日期', N'', N'smalldatetime', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12100, N'raVTqwCbqE', N'R5bRCEu0SI', N'INTERVENTION_RESULT_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12101, N'HnU5NthHUp', N'R5bRCEu0SI', N'身份證字號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12102, N'0QXqSqqOQU', N'R5bRCEu0SI', N'姓名', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12103, N'YHzS2RaSV1', N'R5bRCEu0SI', N'建立日期', N'', N'smalldatetime', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12104, N'RPz08SpuV6', N'R5bRCEu0SI', N'補助申請SN', N'', N'int', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12105, N'wjkNbQf29f', N'R5bRCEu0SI', N'卡或信', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12106, N'MA9Lk1msiR', N'R5bRCEu0SI', N'愛心園丁編號', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12107, N'unVJsjIhd3', N'R5bRCEu0SI', N'愛心園丁姓名', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12108, N'Bt8P7xZaNR', N'R5bRCEu0SI', N'愛心園丁城市鄉鎮', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12109, N'PbNYz6XA9t', N'R5bRCEu0SI', N'愛心園丁地址', N'', N'nvarchar(255)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12110, N'DjCQe0HKwz', N'R5bRCEu0SI', N'愛心園丁郵遞區號', N'', N'nvarchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12111, N'Wmwb8QRNVJ', N'R5bRCEu0SI', N'愛心園丁電話', N'', N'nvarchar(50)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12112, N'mkkYeiHJFr', N'R5bRCEu0SI', N'愛心園丁補助數', N'', N'int', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12113, N'S9DQKZVCz9', N'R5bRCEu0SI', N'配對日期', N'', N'smalldatetime', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12114, N'jgKICNUmS4', N'DbSCqovOEi', N'INTERVENTION_RESULT_SN', N'', N'int', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12115, N'n2wMp648Uj', N'DbSCqovOEi', N'身份證字號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12116, N'9bCVXHgu9E', N'DbSCqovOEi', N'姓名', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12117, N'iL0Ij3QcxW', N'DbSCqovOEi', N'建立日期', N'', N'smalldatetime', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12118, N'ZlDygckOeJ', N'DbSCqovOEi', N'補助申請SN', N'', N'int', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12119, N'VTRgIXQdmP', N'DbSCqovOEi', N'卡或信', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12120, N'bUcHe7FNbh', N'DbSCqovOEi', N'愛心園丁編號', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12121, N'0P3yWMWDu8', N'DbSCqovOEi', N'愛心園丁姓名', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12122, N'W9lOyWgMci', N'DbSCqovOEi', N'愛心園丁城市鄉鎮', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12123, N'7KhSZ6GBQE', N'DbSCqovOEi', N'愛心園丁地址', N'', N'nvarchar(255)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12124, N'eqivbPIIGk', N'DbSCqovOEi', N'愛心園丁郵遞區號', N'', N'nvarchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12125, N'8Obb8edmN6', N'DbSCqovOEi', N'愛心園丁電話', N'', N'nvarchar(50)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12126, N'lZOCBBIVmf', N'DbSCqovOEi', N'愛心園丁補助數', N'', N'int', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12127, N'dBVWrxoa1m', N'DbSCqovOEi', N'配對日期', N'', N'smalldatetime', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12128, N'X1IEtQ7vtQ', N'B6kjooWPf0', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12129, N'jJOCKXcHpx', N'B6kjooWPf0', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12130, N's5d6lIRnOj', N'B6kjooWPf0', N'No', N'', N'varchar(15)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12131, N'fDLwmsCLne', N'B6kjooWPf0', N'Name', N'', N'nvarchar(100)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12132, N'MyF62aQ96b', N'B6kjooWPf0', N'ItemType', N'', N'char(1)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12133, N'5VFrwosRlz', N'B6kjooWPf0', N'Spec', N'', N'nvarchar(100)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12134, N'S7v2THgD7I', N'B6kjooWPf0', N'ForAge', N'', N'nvarchar(100)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12135, N'spxomhxql0', N'B6kjooWPf0', N'Package', N'', N'nvarchar(100)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12136, N'1D1TCErQpI', N'B6kjooWPf0', N'MarketPrice', N'', N'int', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12137, N'WaueRaEh61', N'B6kjooWPf0', N'SpecialPrice', N'', N'int', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12138, N'IFYgZchfNS', N'B6kjooWPf0', N'Status', N'', N'bit', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12139, N'0a21L44ykJ', N'DujrUrmOth', N'身份證字號', N'', N'nvarchar(50)', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12140, N'OSyxE6pEu5', N'xBpzMFr7AT', N'Sn', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12141, N'S4f8HzWtii', N'xBpzMFr7AT', N'Id', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12142, N'jatuifYm9u', N'xBpzMFr7AT', N'CorpName', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12143, N'hvdkFaXvQe', N'xBpzMFr7AT', N'CorpOwner', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12144, N'oBROlRg9Ji', N'xBpzMFr7AT', N'Tel', N'', N'varchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12145, N'wXhZxpMFII', N'xBpzMFr7AT', N'Fax', N'', N'varchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12146, N'4v2b3UuKQJ', N'xBpzMFr7AT', N'Contacter', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12147, N'Gn9nfTxqxb', N'xBpzMFr7AT', N'Extension', N'', N'varchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12148, N'WrhcXmsJHz', N'xBpzMFr7AT', N'Contacter2', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12149, N'WQFv3qxNC2', N'xBpzMFr7AT', N'Extension2', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12150, N'4v2f68eG6r', N'xBpzMFr7AT', N'CityId', N'', N'varchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12151, N'ztNunkp7nO', N'xBpzMFr7AT', N'TownId', N'', N'varchar(10)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12152, N'ogQ7BokXLr', N'xBpzMFr7AT', N'ZipCode', N'', N'varchar(50)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12153, N'9SE2FtrfBf', N'xBpzMFr7AT', N'Road', N'', N'nvarchar(50)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12154, N'42n8KKCcE8', N'xBpzMFr7AT', N'Lane', N'', N'nvarchar(50)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12155, N'msaukdRLbe', N'xBpzMFr7AT', N'InvoiceCityId', N'', N'varchar(10)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12156, N'0dTOhtqjxp', N'xBpzMFr7AT', N'InvoiceTownId', N'', N'varchar(10)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12157, N'W5sXOnFemU', N'xBpzMFr7AT', N'InvoiceZipCode', N'', N'varchar(50)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12158, N'FTjXUTQ2Iu', N'xBpzMFr7AT', N'InvoiceRoad', N'', N'nvarchar(50)', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12159, N'vae0FuU96F', N'xBpzMFr7AT', N'InvoiceLane', N'', N'nvarchar(50)', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12160, N'zzY7CkWbeY', N'xBpzMFr7AT', N'BusinessItem', N'', N'nvarchar(100)', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12161, N'ysnLo8p4y1', N'xBpzMFr7AT', N'UniformCode', N'', N'varchar(50)', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12162, N'pmYfHMz7AA', N'xBpzMFr7AT', N'BranchAddress', N'', N'nvarchar(100)', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12163, N'2d3ZlYh6Qd', N'xBpzMFr7AT', N'Credit', N'', N'nvarchar(50)', 1, N'', 24, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12164, N'sYVZAHm2QA', N'xBpzMFr7AT', N'Quality', N'', N'nvarchar(50)', 1, N'', 25, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12165, N'1BLuXDL8Cx', N'xBpzMFr7AT', N'Cooperation', N'', N'nvarchar(50)', 1, N'', 26, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12166, N'IAbtS1S2RS', N'xBpzMFr7AT', N'WorkId', N'', N'varchar(50)', 1, N'', 27, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12167, N'RvitFF7SpH', N'xBpzMFr7AT', N'MilkId', N'', N'varchar(2000)', 1, N'', 28, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12168, N'REDcFBNCc8', N'xBpzMFr7AT', N'DiaperId', N'', N'varchar(2000)', 1, N'', 29, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12169, N'5YQj5k6xqm', N'xBpzMFr7AT', N'BabyFoodId', N'', N'varchar(2000)', 1, N'', 30, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12170, N'x1BrcXlJX7', N'xBpzMFr7AT', N'BreastMilkId', N'', N'varchar(2000)', 1, N'', 31, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12171, N'YkS8KEHTjz', N'xBpzMFr7AT', N'CreateCenter', N'', N'varchar(50)', 1, N'', 32, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12172, N'9uYwWYgNSZ', N'xBpzMFr7AT', N'Created', N'', N'datetime', 1, N'', 33, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12173, N'TmGachmG9o', N'xBpzMFr7AT', N'Revised', N'', N'datetime', 1, N'', 34, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12174, N'RsTkTNcRNt', N'C8vqfE0WNE', N'POSITION_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12175, N'FcCia27rQD', N'C8vqfE0WNE', N'WORK_ID', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12176, N'AsYHxa38t9', N'C8vqfE0WNE', N'PROJECT_SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12177, N'xqkZy19q7f', N'C8vqfE0WNE', N'JOB_FUNCTION_ID', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12178, N'ydaPE3k6dq', N'etFoyXegqj', N'SQLTOOLSN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12179, N'0ajYWbMy6S', N'etFoyXegqj', N'SQLSTR', N'', N'nvarchar(4000)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12180, N'xWMxDwTrCT', N'etFoyXegqj', N'NAME1', N'', N'nvarchar(1000)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12181, N'fALqkz8W6r', N'kUPyC6CcDh', N'T_AG_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12182, N'QQKw08xTYs', N'kUPyC6CcDh', N'T_AG_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12183, N'YkdaXyVtAW', N'kUPyC6CcDh', N'T_AG_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12184, N'AqmdaSddGB', N'kUPyC6CcDh', N'T_AG_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12185, N'Rme1PVrSBy', N'oJ2lVkRNGb', N'T_BA_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12186, N'DK3ykAksGJ', N'oJ2lVkRNGb', N'T_BA_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12187, N'lAV7Pp2y7u', N'oJ2lVkRNGb', N'T_BA_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12188, N'tsuLvZUIau', N'oJ2lVkRNGb', N'T_BA_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12189, N'7enRLcPzsE', N'V6VVf8gXZ4', N'T_CR_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12190, N'C63kjFRHC3', N'V6VVf8gXZ4', N'T_CR_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12191, N'h9TbaPeETJ', N'V6VVf8gXZ4', N'T_CR_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12192, N'ae7SO7uR2w', N'V6VVf8gXZ4', N'T_CR_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12193, N'Fkqosjg8GJ', N'CcDQQ6Y0rP', N'T_CS_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12194, N'YQh6SEjptX', N'CcDQQ6Y0rP', N'T_CS_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12195, N'GHA9Ofeg9P', N'CcDQQ6Y0rP', N'T_CS_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12196, N'8iUK6m4QEd', N'CcDQQ6Y0rP', N'T_CS_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12197, N'La3HnFhWkp', N'hxQD6wDs0C', N'T_DP_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12198, N'i24GdJWLjb', N'hxQD6wDs0C', N'T_DP_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12199, N'UTycxThLHW', N'hxQD6wDs0C', N'T_DP_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12200, N'FC7DOfKw1n', N'hxQD6wDs0C', N'T_DP_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12201, N'yOlEdk3Mmg', N'XDzR7G1e2M', N'T_DS_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12202, N'7CnKPo1LLd', N'XDzR7G1e2M', N'T_DS_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12203, N'BRCqw4JzBD', N'XDzR7G1e2M', N'T_DS_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12204, N'aR4IvXWKIQ', N'XDzR7G1e2M', N'T_DS_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12205, N'97qIwWgRKf', N'545O2y4cQk', N'T_EL_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12206, N'fITsB3JcI0', N'545O2y4cQk', N'T_EL_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12207, N'Ye5u5MYZOA', N'545O2y4cQk', N'T_EL_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12208, N'dRfuwWhxNe', N'545O2y4cQk', N'T_EL_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12209, N'D386eF4Fti', N'PTZQoSrylI', N'T_ES_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12210, N'VaGJm43Nd1', N'PTZQoSrylI', N'T_ES_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12211, N'5CAMPMJwwC', N'PTZQoSrylI', N'T_ES_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12212, N'63FMcUxzcB', N'PTZQoSrylI', N'T_ES_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12213, N'kvtS8fhByj', N'gHsjhdVVeJ', N'T_GB_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12214, N'6DmSL0gWf4', N'gHsjhdVVeJ', N'T_GB_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12215, N'uQN0dm5xbR', N'gHsjhdVVeJ', N'T_GB_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12216, N'VrOPj8HUqu', N'gHsjhdVVeJ', N'T_GB_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12217, N'zXF5bYAPZb', N'IzqZy6HhBd', N'T_GP_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12218, N'1tOSvGRz4m', N'IzqZy6HhBd', N'T_GP_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12219, N'7t6WA6GpPt', N'IzqZy6HhBd', N'T_GP_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12220, N'qiweSIKgNh', N'IzqZy6HhBd', N'T_GP_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12221, N'zEXof4t7BE', N'0sNQZQajWm', N'T_HD_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12222, N'qAvMmtUyiF', N'0sNQZQajWm', N'T_HD_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12223, N'8qwX5hNLwJ', N'0sNQZQajWm', N'T_HD_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12224, N'hqeOsPjZAt', N'0sNQZQajWm', N'T_HD_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12225, N'2bHdhCA0SM', N'OxKwBO6gvd', N'T_HS_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12226, N'REVgO2AGye', N'OxKwBO6gvd', N'T_HS_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12227, N'awO3JffTiN', N'OxKwBO6gvd', N'T_HS_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12228, N'OBzNn4gaF6', N'OxKwBO6gvd', N'T_HS_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12229, N'EV4nuFm1sR', N'rNIxz0zVNk', N'T_JB_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12230, N'qGUGozTPDU', N'rNIxz0zVNk', N'T_JB_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12231, N'bZSGyhliGz', N'rNIxz0zVNk', N'T_JB_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12232, N'uU3dw43ROY', N'rNIxz0zVNk', N'T_JB_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12233, N'6YT9zObQ7d', N'piyDNnmdxP', N'T_KG_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12234, N'qetVWjHHOS', N'piyDNnmdxP', N'T_KG_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12235, N'sIyNJsiB6y', N'piyDNnmdxP', N'T_KG_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12236, N'4LZDjQluCw', N'piyDNnmdxP', N'T_KG_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12237, N'XLTrhE56pE', N'jxZMC0t3WX', N'T_MA_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12238, N'NpGrZqdLz9', N'jxZMC0t3WX', N'T_MA_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12239, N'8UoSkQEXBa', N'jxZMC0t3WX', N'T_MA_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12240, N'aCZpBD9acu', N'jxZMC0t3WX', N'T_MA_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12241, N'f8PaC6DhcC', N'kSJtwrqTSa', N'T_MF_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12242, N'9Xa8vGIh9y', N'kSJtwrqTSa', N'T_MF_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12243, N'mJMefspjrE', N'kSJtwrqTSa', N'T_MF_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12244, N'Br1KEAxgcb', N'kSJtwrqTSa', N'T_MF_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12245, N'OCctMIyOgm', N'Udm54LYXyy', N'T_MS_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12246, N'Gt026TPzQN', N'Udm54LYXyy', N'T_MS_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12247, N'VI7Fa7hjvn', N'Udm54LYXyy', N'T_MS_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12248, N'MCW5A6mGbG', N'Udm54LYXyy', N'T_MS_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12249, N'aEAIMvUCBo', N'wwaD1pA3nJ', N'T_OS_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12250, N'aXviUQ0hUc', N'wwaD1pA3nJ', N'T_OS_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12251, N'oaqBPUzA1L', N'wwaD1pA3nJ', N'T_OS_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12252, N'kvxzzkTzQv', N'wwaD1pA3nJ', N'T_OS_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12253, N'xkiIEEgBCt', N'8hRM8MAu7p', N'T_PA_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12254, N'AyaFxQFO6O', N'8hRM8MAu7p', N'T_PA_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12255, N'5UwrcE39KV', N'8hRM8MAu7p', N'T_PA_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12256, N'tK3NwvHiAs', N'8hRM8MAu7p', N'T_PA_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12257, N'IO8avWa8jX', N'Wz2O0zQz4Q', N'T_PM_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12258, N'usxY4SKLed', N'Wz2O0zQz4Q', N'T_PM_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12259, N'Aqc48bdGI8', N'Wz2O0zQz4Q', N'T_PM_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12260, N'LPIK5haDxn', N'Wz2O0zQz4Q', N'T_PM_ON', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12261, N'7TbzdGhtSe', N'Wz2O0zQz4Q', N'T_PM_ORDER', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12262, N'42aZtuvgx5', N'd6yNEAJA6j', N'T_RS_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12263, N't232FJzl7X', N'd6yNEAJA6j', N'T_RS_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12264, N'nY5O7lg8s4', N'd6yNEAJA6j', N'T_RS_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12265, N'8qKcUW2lCc', N'd6yNEAJA6j', N'T_RS_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12266, N'ad7UkJXFxn', N'7nMwYO4PuU', N'T_SA_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12267, N'khQRJxkFaa', N'7nMwYO4PuU', N'T_SA_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12268, N'FTmlCE3ZHH', N'7nMwYO4PuU', N'T_SA_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12269, N'ALHSf3OLhk', N'7nMwYO4PuU', N'T_SA_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12270, N'gTveUsDyvo', N'kG2Zz1jy1x', N'T_SB_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12271, N'Yx0Qk7dwrZ', N'kG2Zz1jy1x', N'T_SB_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12272, N'kH2qGPIfr8', N'kG2Zz1jy1x', N'T_SB_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12273, N'nsNsHog1to', N'kG2Zz1jy1x', N'T_SB_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12274, N'IeUWJwWzGV', N'4Mues4mVpb', N'T_SI_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12275, N'rcAqNE9wrP', N'4Mues4mVpb', N'T_SI_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12276, N'LLykP4Y8gX', N'4Mues4mVpb', N'T_SI_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12277, N'uvSRzmJmQP', N'4Mues4mVpb', N'T_SI_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12278, N'ennMsDIiaW', N'nDyJhwQGye', N'T_SK_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12279, N'GkETRXGkTs', N'nDyJhwQGye', N'T_SK_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12280, N'tNPmSvCklO', N'nDyJhwQGye', N'T_SK_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12281, N'351qck8aaC', N'nDyJhwQGye', N'T_SK_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12282, N'oiM0OTFBUn', N'dbH5AJOmH4', N'T_SM_SN', N'', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12283, N'9SFSiS7o79', N'dbH5AJOmH4', N'T_SM_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12284, N'J6tnGwoBIQ', N'dbH5AJOmH4', N'T_SM_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12285, N'9RbSzDFHRE', N'dbH5AJOmH4', N'T_SM_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12286, N'fdBc8HAsiY', N'dbH5AJOmH4', N'T_SM_UNIT_M', N'', N'int', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12287, N's2Pko1GKU6', N'dbH5AJOmH4', N'T_SM_UNIT_M_A', N'', N'int', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12288, N'cE7W3lpWHN', N'wmzv5eLzOG', N'T_ST_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12289, N'sT6s1MFe9C', N'wmzv5eLzOG', N'T_ST_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12290, N'oHpZunIMpb', N'wmzv5eLzOG', N'T_ST_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12291, N'RUxzESdIHA', N'wmzv5eLzOG', N'T_ST_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12292, N'FG4qAiP8KR', N'OKc9nCj7qx', N'T_SU_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12293, N'a0f8i51PQQ', N'OKc9nCj7qx', N'T_SU_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12294, N'T625Kkqlq5', N'OKc9nCj7qx', N'T_SU_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12295, N'yHIGfi90v6', N'OKc9nCj7qx', N'T_SU_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12296, N'cI2uCEo4iR', N'EU7FGvndXY', N'T_SW_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12297, N'Nj2BECTJET', N'EU7FGvndXY', N'T_SW_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12298, N'iXDddkrRS6', N'EU7FGvndXY', N'T_SW_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12299, N'e96QaxnXiu', N'EU7FGvndXY', N'T_SW_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12300, N'mb9qK61yON', N'ASPMXDBoa4', N'T_TC_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12301, N'ikaCJr9U1B', N'ASPMXDBoa4', N'T_TC_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12302, N'G6dYsSsWHO', N'ASPMXDBoa4', N'T_TC_NAME', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12303, N'KHPTdGHvEz', N'ASPMXDBoa4', N'T_TC_ORDER', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12304, N'MjKEdQQA4i', N'tUSkGWOqQK', N'Code', N'', N'varchar(100)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12305, N'qGpPX0tGbE', N'tUSkGWOqQK', N'TableCode', N'', N'varchar(100)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12306, N'D9fJeCfsXN', N'tUSkGWOqQK', N'DataType', N'', N'varchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12307, N'ImMKsav1l0', N'tUSkGWOqQK', N'Nullable', N'', N'bit', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12308, N'8Vrk0iobpN', N'tUSkGWOqQK', N'DefaultValue', N'', N'varchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12309, N'r0iaWtvOL1', N'tUSkGWOqQK', N'Sort', N'', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12310, N'hhnmPk20GN', N'tUSkGWOqQK', N'Note', N'', N'nvarchar(100)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12311, N'n2v0NVmpEm', N'PXtcBLTqq7', N'Code', N'', N'varchar(100)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12312, N'ZXaj00RryH', N'PXtcBLTqq7', N'Note', N'', N'nvarchar(255)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12313, N'PPCw9njmbA', N'ltZ6HlmMc4', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12314, N'k4F7M9Opxn', N'ltZ6HlmMc4', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12315, N'hanKFC4p0c', N'ltZ6HlmMc4', N'CityId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12316, N'OUDudPjxoA', N'ltZ6HlmMc4', N'Sort', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12317, N'G5dgWbrQ6s', N'wlB7RWXtef', N'USER_SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12318, N'Pxmz6y3J54', N'wlB7RWXtef', N'PROJECT', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12319, N'4Ogj5uFFRc', N'wlB7RWXtef', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12320, N'uyl7cQIYpj', N'wlB7RWXtef', N'LOGIN_NAME', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12321, N'1lnkJ5RWhF', N'wlB7RWXtef', N'PASSWORD', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12322, N'CIzmdAeoy9', N'wlB7RWXtef', N'NAME', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12323, N'J9asD7ZRJn', N'wlB7RWXtef', N'T_GP_ID', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12324, N'CRzDEm9k5d', N'wlB7RWXtef', N'T_JB_ID', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12325, N'0YAiPaNkNA', N'wlB7RWXtef', N'T_DP_ID', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12326, N'AdgvxBuGae', N'wlB7RWXtef', N'USER_STATE', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12327, N'Ge1CJWDvKp', N'wlB7RWXtef', N'USER_EMAIL', N'', N'nvarchar(50)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12328, N'JZvuFA6I6l', N'wlB7RWXtef', N'USER_LOGINDATE', N'', N'smalldatetime', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12329, N'IciBfoO9Mk', N'wlB7RWXtef', N'DUTY1', N'', N'nvarchar(500)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12330, N'W1eXJlr7Bk', N'wlB7RWXtef', N'BOSS_WORK_ID', N'', N'nvarchar(50)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12331, N'clb9JytgVB', N'wlB7RWXtef', N'TEL', N'', N'nvarchar(50)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12332, N'P8n4rRqN00', N'wlB7RWXtef', N'TEL_EXT', N'', N'nvarchar(50)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12333, N'Gr7PjVdDEU', N'wlB7RWXtef', N'EMP_ID', N'', N'nvarchar(50)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12334, N'9bJzFhhTwg', N'wlB7RWXtef', N'Day22Allow', N'', N'nvarchar(4)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12335, N'97QediONjj', N'F23giABfk2', N'Type', N'', N'varchar(20)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12336, N'0HaeSe7Ju6', N'F23giABfk2', N'Value', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12337, N'4IE7Tqbm5Z', N'F23giABfk2', N'Name', N'', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12338, N'mAlEaxVwMK', N'F23giABfk2', N'Sort', N'', N'int', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12339, N'7FD9f2hYWv', N'F23giABfk2', N'Ext', N'', N'varchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12340, N'nE2BLGG9C0', N'F23giABfk2', N'Note', N'', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12341, N'Jlqd3I8JRA', N'C8pMJp5dKa', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12342, N'57jGVRUDDA', N'C8pMJp5dKa', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12343, N'PEC5IhGEj7', N'C8pMJp5dKa', N'MgrId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12344, N'rMPtkt5upx', N'sGQRl5dVaB', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12345, N'XasOnkuWUK', N'sGQRl5dVaB', N'Code', N'', N'varchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12346, N'8RlT1woSYd', N'sGQRl5dVaB', N'Name', N'', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12347, N'mUGTlmzbnA', N'sGQRl5dVaB', N'Icon', N'', N'varchar(20)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12348, N'rYHSzMG4Em', N'sGQRl5dVaB', N'Url', N'', N'varchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12349, N'DNNg2aLP7I', N'sGQRl5dVaB', N'Sort', N'', N'smallint', 0, N'9', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12350, N'7otLj0bUBR', N'sGQRl5dVaB', N'AuthRow', N'', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12351, N'9JRCTcMcVh', N'sGQRl5dVaB', N'FunCreate', N'', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12352, N'FaiUkKJXA0', N'sGQRl5dVaB', N'FunRead', N'', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12353, N'7Z52gAGbFJ', N'sGQRl5dVaB', N'FunUpdate', N'', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12354, N'STxaRql8ch', N'sGQRl5dVaB', N'FunDelete', N'', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12355, N'Wwj4v1Na8m', N'sGQRl5dVaB', N'FunPrint', N'', N'tinyint', 0, N'0', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12356, N'NpaP5uYHQj', N'sGQRl5dVaB', N'FunExport', N'', N'tinyint', 0, N'0', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12357, N'44bYO6trNN', N'sGQRl5dVaB', N'FunView', N'', N'tinyint', 0, N'0', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12358, N'pbWtQhZBKz', N'sGQRl5dVaB', N'FunOther', N'', N'tinyint', 0, N'0', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12359, N'tz5P9HU464', N'i5J81wWNzO', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12360, N'nnovjh7D99', N'i5J81wWNzO', N'Name', N'', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12361, N'hPY8prKcHj', N'IX7aJo9GLZ', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12362, N'mJd4GSfJrz', N'IX7aJo9GLZ', N'RoleId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12363, N'eQJSlMdPPv', N'IX7aJo9GLZ', N'ProgId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12364, N'x3iwsSMz3F', N'IX7aJo9GLZ', N'FunCreate', N'', N'tinyint', 0, N'0', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12365, N'8NTJfULYBF', N'IX7aJo9GLZ', N'FunRead', N'', N'tinyint', 0, N'0', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12366, N'NHAWgd70b7', N'IX7aJo9GLZ', N'FunUpdate', N'', N'tinyint', 0, N'0', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12367, N'oblVRadmY3', N'IX7aJo9GLZ', N'FunDelete', N'', N'tinyint', 0, N'0', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12368, N'k4Pqs5An99', N'IX7aJo9GLZ', N'FunPrint', N'', N'tinyint', 0, N'0', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12369, N'uE2mdhgfhB', N'IX7aJo9GLZ', N'FunExport', N'', N'tinyint', 0, N'0', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12370, N'Skc8Cwp4vO', N'IX7aJo9GLZ', N'FunView', N'', N'tinyint', 0, N'0', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12371, N'HTD19jYn83', N'IX7aJo9GLZ', N'FunOther', N'', N'tinyint', 0, N'0', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12372, N'H8ECAEnOrD', N'8HzsNUUuj6', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12373, N'sNI58r8g3O', N'8HzsNUUuj6', N'Name', N'', N'nvarchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12374, N'uWbVqJ42xP', N'8HzsNUUuj6', N'Account', N'', N'varchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12375, N'ZMbf2Jt9Xi', N'8HzsNUUuj6', N'Pwd', N'', N'varchar(32)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12376, N'7v06j2mFDj', N'8HzsNUUuj6', N'DeptId', N'', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12377, N'HYoIlO9Mke', N'8HzsNUUuj6', N'Status', N'', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12378, N'pVBWJaMJhZ', N'EYHBxvl56X', N'Id', N'', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12379, N'gZ0K23fbPZ', N'EYHBxvl56X', N'UserId', N'', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12380, N'3wsn2Fu0nq', N'EYHBxvl56X', N'RoleId', N'', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12381, N'Llble16R8l', N'udVS9Vysvk', N'出貨SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12382, N'N09nTKptiM', N'udVS9Vysvk', N'產品類別', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12383, N'dx1auOe72w', N'udVS9Vysvk', N'產品編號', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12384, N'xwpNcv1mvt', N'udVS9Vysvk', N'廠商SN', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12385, N'mOH6xManrE', N'udVS9Vysvk', N'出貨數量', N'', N'int', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12386, N'3mujU6yzR6', N'udVS9Vysvk', N'庫存地點', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12387, N'Y4Uga0b3au', N'udVS9Vysvk', N'自動新增', N'', N'int', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12388, N'JS7OsaHVpy', N'udVS9Vysvk', N'來源', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12389, N'012ngqnzUC', N'udVS9Vysvk', N'出貨日期', N'', N'smalldatetime', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12390, N'O9U2N5pqo1', N'yVIHr8WnpA', N'出貨_細目SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12391, N'mokQZgG1D7', N'yVIHr8WnpA', N'出貨SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12392, N'Oo7Nozo4oN', N'yVIHr8WnpA', N'補助申請SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12393, N'AkZH8hoKT7', N'yVIHr8WnpA', N'個案身分證', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12394, N'lUnnjOPNJs', N'yVIHr8WnpA', N'個案姓名', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12395, N'5YyvgCWk0k', N'yVIHr8WnpA', N'中心', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12396, N'UO3k7AwEAc', N'yVIHr8WnpA', N'社工', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12397, N'gf2CMT9wgN', N'yVIHr8WnpA', N'需求數量', N'', N'int', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12398, N'z6jwCX7Q6Z', N'yVIHr8WnpA', N'出貨數量', N'', N'int', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12399, N'GRTuZXwdLe', N'Jw7MtURukJ', N'奶水SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12400, N'T9aJfZ4tcK', N'Jw7MtURukJ', N'奶水編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12401, N'ToDkSevdV6', N'Jw7MtURukJ', N'產品名稱', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12402, N'npztwXjBHa', N'Jw7MtURukJ', N'規格', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12403, N'xm5EU8aiUp', N'Jw7MtURukJ', N'適用年齡', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12404, N'9Rh4q9Qlr8', N'Jw7MtURukJ', N'包裝', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12405, N'Owno1WDFBA', N'Jw7MtURukJ', N'市價', N'', N'float', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12406, N'SIiOkta4v2', N'Jw7MtURukJ', N'優惠價', N'', N'float', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12407, N'9FeT6ZROVf', N'Jw7MtURukJ', N'狀態', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12408, N'rK1xcNrrqj', N'mWbecH4wVu', N'奶粉SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12409, N'ebty8XXpqJ', N'mWbecH4wVu', N'奶粉編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12410, N'hemH7u4IYU', N'mWbecH4wVu', N'產品名稱', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12411, N'0oY22YlKuI', N'mWbecH4wVu', N'規格', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12412, N'XC0aYD9btl', N'mWbecH4wVu', N'適用年齡', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12413, N'9bgRyWFsX3', N'mWbecH4wVu', N'包裝', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12414, N'7ukzlFKa74', N'mWbecH4wVu', N'市價', N'', N'float', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12415, N'VFxSGujBUa', N'mWbecH4wVu', N'優惠價', N'', N'float', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12416, N'LS08rU9jmZ', N'mWbecH4wVu', N'狀態', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12417, N'F4j2VOHmJs', N'niVUbu8f3J', N'尿布SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12418, N'wZv8O4jUIW', N'niVUbu8f3J', N'尿布編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12419, N'g1fM8Qaprg', N'niVUbu8f3J', N'產品名稱', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12420, N'NPYDjy4UT1', N'niVUbu8f3J', N'規格', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12421, N'9DtosXMDsv', N'niVUbu8f3J', N'適用年齡', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12422, N'CU2QUJMbq8', N'niVUbu8f3J', N'包裝', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12423, N'3d0xXY9SFl', N'niVUbu8f3J', N'市價', N'', N'float', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12424, N'ZACvqThkhU', N'niVUbu8f3J', N'優惠價', N'', N'float', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12425, N'9pViLmT1o5', N'niVUbu8f3J', N'狀態', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12426, N'jqr7HrspDV', N's6o31cuAwQ', N'客戶SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12427, N'PMxgpIBpFo', N's6o31cuAwQ', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12428, N'iCK1SFJEb6', N's6o31cuAwQ', N'客戶ID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12429, N'Cxkp0VtJtT', N's6o31cuAwQ', N'類型', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12430, N'ns20Sgz782', N's6o31cuAwQ', N'單位名稱', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12431, N'11dVQT0DEg', N's6o31cuAwQ', N'簡稱', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12432, N'l1Sf8EqSle', N's6o31cuAwQ', N'創立日期', N'', N'smalldatetime', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12433, N'oJsUc3DFtE', N's6o31cuAwQ', N'資本額', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12434, N'xwKO5imGX9', N's6o31cuAwQ', N'營業額', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12435, N'3sAZRL0Q3m', N's6o31cuAwQ', N'員工數', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12436, N'VwVRe7YNkq', N's6o31cuAwQ', N'負責人', N'', N'nvarchar(50)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12437, N'RPN8wtOmyi', N's6o31cuAwQ', N'電話', N'', N'nvarchar(50)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12438, N'mMfVNQmjYA', N's6o31cuAwQ', N'傳真', N'', N'nvarchar(50)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12439, N'tuSnj94bsG', N's6o31cuAwQ', N'寄送刊物', N'', N'nvarchar(50)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12440, N'QoMJjQaBVl', N's6o31cuAwQ', N'網址', N'', N'nvarchar(50)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12441, N'Adt88LKQaA', N's6o31cuAwQ', N'聯絡人', N'', N'nvarchar(50)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12442, N'9bNFpNcE8z', N's6o31cuAwQ', N'聯絡人_電話', N'', N'nvarchar(50)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12443, N'ZM4lSr1mJc', N's6o31cuAwQ', N'聯絡人_分機', N'', N'nvarchar(50)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12444, N'LNxBqUetqn', N's6o31cuAwQ', N'聯絡人_EMAIL', N'', N'nvarchar(50)', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12445, N'RRJRbAjwem', N's6o31cuAwQ', N'聯絡人2', N'', N'nvarchar(50)', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12446, N'b9CNy5KhB5', N's6o31cuAwQ', N'聯絡人_電話2', N'', N'nvarchar(50)', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12447, N'EOrIjJwj86', N's6o31cuAwQ', N'聯絡人_分機2', N'', N'nvarchar(50)', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12448, N'kJNaCRoXHj', N's6o31cuAwQ', N'聯絡人_EMAIL2', N'', N'nvarchar(50)', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12449, N'XinRRQx22w', N's6o31cuAwQ', N'手機', N'', N'nvarchar(50)', 1, N'', 24, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12450, N'E0ZyW2Aagd', N's6o31cuAwQ', N'地址縣市', N'', N'nvarchar(50)', 1, N'', 25, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12451, N'zUljy22h1q', N's6o31cuAwQ', N'地址鄉鎮市', N'', N'nvarchar(50)', 1, N'', 26, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12452, N'MmhGdymlUv', N's6o31cuAwQ', N'地址Zip', N'', N'nvarchar(50)', 1, N'', 27, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12453, N'7c3g8DLziO', N's6o31cuAwQ', N'地址', N'', N'nvarchar(50)', 1, N'', 28, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12454, N'j5gyYbf4mj', N's6o31cuAwQ', N'發票地址', N'', N'nvarchar(50)', 1, N'', 29, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12455, N'HiRtmse9YF', N's6o31cuAwQ', N'營業項目', N'', N'nvarchar(50)', 1, N'', 30, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12456, N'fLv90VCiMR', N's6o31cuAwQ', N'統編', N'', N'nvarchar(50)', 1, N'', 31, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12457, N'Wx4bKbVw5f', N's6o31cuAwQ', N'資料來源', N'', N'nvarchar(50)', 1, N'', 32, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12458, N'91vVVwAFUw', N's6o31cuAwQ', N'資料來源備註', N'', N'nvarchar(50)', 1, N'', 33, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12459, N'UXGRN1T1NR', N's6o31cuAwQ', N'資源管道', N'', N'nvarchar(50)', 1, N'', 34, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12460, N'cczU0n7smL', N's6o31cuAwQ', N'備註', N'', N'nvarchar(50)', 1, N'', 35, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12461, N'XIA92VQbr9', N's6o31cuAwQ', N'信用', N'', N'nvarchar(50)', 1, N'', 36, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12462, N'1wMcQVXoEB', N's6o31cuAwQ', N'品質', N'', N'nvarchar(50)', 1, N'', 37, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12463, N'J7vGJatomP', N's6o31cuAwQ', N'等級', N'', N'nvarchar(50)', 1, N'', 38, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12464, N'xHuINDlYlX', N's6o31cuAwQ', N'建檔日', N'', N'nvarchar(50)', 1, N'', 39, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12465, N'IsjmAOKm5d', N's6o31cuAwQ', N'姓名', N'', N'nvarchar(50)', 1, N'', 40, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12466, N'gkTvzkMCw2', N's6o31cuAwQ', N'身分證字號', N'', N'nvarchar(50)', 1, N'', 41, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12467, N'UAN3mdu1jZ', N's6o31cuAwQ', N'性別', N'', N'nvarchar(50)', 1, N'', 42, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12468, N'Gj019B9gGk', N's6o31cuAwQ', N'生日', N'', N'nvarchar(50)', 1, N'', 43, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12469, N'FHLiBbgghv', N's6o31cuAwQ', N'學歷', N'', N'nvarchar(50)', 1, N'', 44, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12470, N'seizQENy5K', N's6o31cuAwQ', N'科系', N'', N'nvarchar(50)', 1, N'', 45, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12471, N'ss0h0EXRro', N's6o31cuAwQ', N'專長', N'', N'nvarchar(50)', 1, N'', 46, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12472, N'WzVRDz7B9H', N's6o31cuAwQ', N'職稱', N'', N'nvarchar(50)', 1, N'', 47, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12473, N'7A5Q2FLs5s', N's6o31cuAwQ', N'宗教信仰', N'', N'nvarchar(50)', 1, N'', 48, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12474, N'tc0zNfJ0fA', N's6o31cuAwQ', N'PID', N'', N'nvarchar(50)', 1, N'', 49, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12475, N'X3ba0XPXrd', N's6o31cuAwQ', N'異動', N'', N'nvarchar(10)', 1, N'', 50, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12476, N'LZhYMbDFf1', N'6ZsT3fGQ1E', N'客戶服務SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12477, N'KFty33GjGq', N'6ZsT3fGQ1E', N'客戶SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12478, N'i0aXtpObhr', N'6ZsT3fGQ1E', N'日期', N'', N'smalldatetime', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12479, N'MSgnJqj1V1', N'6ZsT3fGQ1E', N'內容', N'', N'nvarchar(500)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12480, N'EgKn276Gqy', N'E3LU2LSLTU', N'客戶歸屬', N'', N'nvarchar(50)', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12481, N'lxUaagEux0', N'E3LU2LSLTU', N'客戶ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12482, N'69fpEjFMN8', N'xQdSRjpEQi', N'副食品SN', N'', N'int', 0, N'', 1, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12483, N'0edB6Q6zqz', N'xQdSRjpEQi', N'副食品編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12484, N'2YUVWOO6vm', N'xQdSRjpEQi', N'產品名稱', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12485, N'wpzdby9Usi', N'xQdSRjpEQi', N'規格', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12486, N'41xMIn2x8c', N'xQdSRjpEQi', N'適用年齡', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12487, N'OlvrTlhCIy', N'xQdSRjpEQi', N'包裝', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12488, N'c37UffKPNu', N'xQdSRjpEQi', N'市價', N'', N'float', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12489, N'F8WFOglZ1Z', N'xQdSRjpEQi', N'優惠價', N'', N'float', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12490, N'Y6Mj3ehsK0', N'xQdSRjpEQi', N'狀態', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12491, N'5DiCBtjchK', N'obVcWBy6KC', N'採購SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12492, N'JnYdyr0LaU', N'obVcWBy6KC', N'產品編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12493, N'wHS2p7Pae1', N'obVcWBy6KC', N'廠商SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12494, N'uxYGgJS9D7', N'obVcWBy6KC', N'採購數量', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12495, N'zXEhoFgTNS', N'obVcWBy6KC', N'有效期限', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12496, N'J5m80PAd4Y', N'obVcWBy6KC', N'庫存地點', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12497, N'NjuV5ZfqXo', N'obVcWBy6KC', N'入庫日期', N'', N'smalldatetime', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12498, N'j3c5JpPRcm', N'obVcWBy6KC', N'來源', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12499, N'7cEVqzDF2j', N'obVcWBy6KC', N'捐款人', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12500, N'r7tKbZxEu7', N'obVcWBy6KC', N'捐款人PID', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12501, N'FGFwu1BYuU', N'rbfZK35isV', N'採購SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12502, N'aNUc0SSmPC', N'rbfZK35isV', N'產品編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12503, N'kEd3XOLI0H', N'rbfZK35isV', N'廠商SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12504, N'o91kdsaZjL', N'rbfZK35isV', N'採購數量', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12505, N'3k6IaSDnbx', N'rbfZK35isV', N'有效期限', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12506, N'5g7G3dMQdg', N'rbfZK35isV', N'庫存地點', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12507, N'KaX1H1WsoA', N'rbfZK35isV', N'入庫日期', N'', N'smalldatetime', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12508, N'LbPDiNEigC', N'rbfZK35isV', N'來源', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12509, N'vneJL5gvIM', N'rbfZK35isV', N'捐款人', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12510, N'NqwA9sbCWC', N'rbfZK35isV', N'捐款人PID', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12511, N'tkPDdQe5A9', N'9flTTnMkAG', N'採購SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12512, N'DcbdhcQeEJ', N'9flTTnMkAG', N'產品編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12513, N'fWaOeg40tn', N'9flTTnMkAG', N'廠商SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12514, N'5g1c7syNO9', N'9flTTnMkAG', N'採購數量', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12515, N'un3cafdH3T', N'9flTTnMkAG', N'有效期限', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12516, N'ghyjTj8Ohj', N'9flTTnMkAG', N'庫存地點', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12517, N'98ijxM0i7n', N'9flTTnMkAG', N'入庫日期', N'', N'smalldatetime', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12518, N'i2FnPEFT4Q', N'9flTTnMkAG', N'來源', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12519, N'xeUxRc3jjE', N'9flTTnMkAG', N'捐款人', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12520, N'E6FgbZpE38', N'9flTTnMkAG', N'捐款人PID', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12521, N'nH6wsfkCbU', N'oJNzrer5cG', N'採購SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12522, N'AYRivEOQbY', N'oJNzrer5cG', N'產品編號', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12523, N'fGbsRWglqK', N'oJNzrer5cG', N'廠商SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12524, N'oHBfIwoZPW', N'oJNzrer5cG', N'採購數量', N'', N'int', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12525, N'bjZwRPqlEx', N'oJNzrer5cG', N'有效期限', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12526, N'rhiG2FYNoT', N'oJNzrer5cG', N'庫存地點', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12527, N'ab1ytJccDS', N'oJNzrer5cG', N'入庫日期', N'', N'smalldatetime', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12528, N'anmsx2fy9d', N'oJNzrer5cG', N'來源', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12529, N'TONAZ9Qikn', N'oJNzrer5cG', N'捐款人', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12530, N'QvAVwUyv9S', N'oJNzrer5cG', N'捐款人PID', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12531, N'ieNsewyGB3', N'F0lDegAn39', N'補助申請SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12532, N'k5luJXoyHT', N'F0lDegAn39', N'CASE0SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12533, N'DmLUB5aKC7', N'F0lDegAn39', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12534, N'anFMethj4L', N'F0lDegAn39', N'經辦人', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12535, N'9g6MeEXtJk', N'F0lDegAn39', N'登錄日期', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12536, N'RHlwwNMKlK', N'F0lDegAn39', N'案主年齡', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12537, N'2rZ30uPj1X', N'F0lDegAn39', N'收件人姓名', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12538, N'sw1ZmWsw4J', N'F0lDegAn39', N'PhoneAreacode_rec', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12539, N'HUChIq1GlX', N'F0lDegAn39', N'Phone_rec', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12540, N'oBDuQYWa00', N'F0lDegAn39', N'MainContactZip', N'', N'nvarchar(255)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12541, N'mkeH8Fp6TG', N'F0lDegAn39', N'MainContactCity', N'', N'nvarchar(255)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12542, N'KVC2kFHFRc', N'F0lDegAn39', N'MainContactAddress', N'', N'nvarchar(255)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12543, N'foQ3CgKc1f', N'F0lDegAn39', N'MainContactArea', N'', N'nvarchar(255)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12544, N'g5Ckk1fq11', N'F0lDegAn39', N'SendZip', N'', N'nvarchar(255)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12545, N'g3jualr2uz', N'F0lDegAn39', N'SendCity', N'', N'nvarchar(255)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12546, N'PsFQ27Z2m0', N'F0lDegAn39', N'SendAddress', N'', N'nvarchar(255)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12547, N'hIsMG9DHwM', N'F0lDegAn39', N'SendArea', N'', N'nvarchar(255)', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12548, N'5Sja5j0Msq', N'F0lDegAn39', N'T_PM_ID', N'', N'nvarchar(50)', 1, N'', 18, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12549, N'FCTzkWdCPC', N'F0lDegAn39', N'補助時間起', N'', N'datetime', 1, N'', 19, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12550, N'cTnuOv0ci0', N'F0lDegAn39', N'補助時間迄', N'', N'datetime', 1, N'', 20, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12551, N'P2bvOAEJd1', N'F0lDegAn39', N'奶粉編號', N'', N'nvarchar(50)', 1, N'', 21, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12552, N'ANJKAvAmM8', N'F0lDegAn39', N'奶粉編號2', N'', N'nvarchar(50)', 1, N'', 22, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12553, N'hNcQENJiVC', N'F0lDegAn39', N'奶粉編號3', N'', N'nvarchar(50)', 1, N'', 23, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12554, N'ZZDOqreWIo', N'F0lDegAn39', N'奶粉口數', N'', N'int', 1, N'', 24, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12555, N'3aSJJm0A4y', N'F0lDegAn39', N'奶粉數量', N'', N'int', 1, N'', 25, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12556, N'cTferQeXhA', N'F0lDegAn39', N'實際配送奶粉罐數', N'', N'int', 1, N'', 26, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12557, N'DcAda4uf7Q', N'F0lDegAn39', N'奶水編號', N'', N'nvarchar(50)', 1, N'', 27, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12558, N'34sCy4A9ED', N'F0lDegAn39', N'奶水編號2', N'', N'nvarchar(50)', 1, N'', 28, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12559, N'Ip5OytejPP', N'F0lDegAn39', N'奶水編號3', N'', N'nvarchar(50)', 1, N'', 29, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12560, N'Lq7CG1nWSI', N'F0lDegAn39', N'奶水口數', N'', N'int', 1, N'', 30, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12561, N'sOrRTmqmpK', N'F0lDegAn39', N'奶水數量', N'', N'int', 1, N'', 31, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12562, N'CJ551W6guj', N'F0lDegAn39', N'實際配送奶水罐數', N'', N'int', 1, N'', 32, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12563, N'QXDaH34LWc', N'F0lDegAn39', N'尿布編號', N'', N'nvarchar(50)', 1, N'', 33, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12564, N'Vf1EjMql4X', N'F0lDegAn39', N'尿布編號2', N'', N'nvarchar(50)', 1, N'', 34, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12565, N'OBc6LrOIOa', N'F0lDegAn39', N'尿布編號3', N'', N'nvarchar(50)', 1, N'', 35, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12566, N'BSFeTsy7Xm', N'F0lDegAn39', N'尿布口數', N'', N'int', 1, N'', 36, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12567, N'CWi4k3KdmP', N'F0lDegAn39', N'尿布數量', N'', N'int', 1, N'', 37, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12568, N'TLWPUU0PTn', N'F0lDegAn39', N'實際配送尿布包數', N'', N'int', 1, N'', 38, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12569, N'E3ii6QGYVV', N'F0lDegAn39', N'副食品編號', N'', N'nvarchar(50)', 1, N'', 39, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12570, N'RYXEY8wPdb', N'F0lDegAn39', N'副食品編號2', N'', N'nvarchar(50)', 1, N'', 40, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12571, N'JrLdCIghfe', N'F0lDegAn39', N'副食品編號3', N'', N'nvarchar(50)', 1, N'', 41, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12572, N'6Fu4sDjG7Q', N'F0lDegAn39', N'副食品口數', N'', N'int', 1, N'', 42, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12573, N'EkutFDLqHq', N'F0lDegAn39', N'副食品數量', N'', N'int', 1, N'', 43, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12574, N'NYTrvGdo5c', N'F0lDegAn39', N'實際配送副食品罐數', N'', N'int', 1, N'', 44, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12575, N'oKczU1vYc5', N'F0lDegAn39', N'經濟支持_媒體', N'', N'nvarchar(10)', 1, N'', 45, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12576, N'WLWEySrfmB', N'F0lDegAn39', N'經濟支持單位數', N'', N'int', 1, N'', 46, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12577, N'YeqfR72AxA', N'F0lDegAn39', N'經濟支持金額', N'', N'int', 1, N'', 47, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12578, N'wDunHTJypt', N'F0lDegAn39', N'實際經濟支持金額', N'', N'int', 1, N'', 48, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12579, N'YwuNAYmuqC', N'F0lDegAn39', N'人事成本_媒體', N'', N'nvarchar(10)', 1, N'', 49, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12580, N'twAtThQl8e', N'F0lDegAn39', N'人事成本單位數', N'', N'int', 1, N'', 50, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12581, N'ja4zR3T1d1', N'F0lDegAn39', N'人事成本金額', N'', N'int', 1, N'', 51, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12582, N'f5jzc4d0yg', N'F0lDegAn39', N'實際人事成本金額', N'', N'int', 1, N'', 52, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12583, N'6T6XcU4Thz', N'F0lDegAn39', N'輔具補助費_媒體', N'', N'nvarchar(10)', 1, N'', 53, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12584, N'YioJmo6NKd', N'F0lDegAn39', N'輔具補助費單位數', N'', N'int', 1, N'', 54, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12585, N'zSJJZzihqG', N'F0lDegAn39', N'輔具補助費金額', N'', N'int', 1, N'', 55, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12586, N'hTr3KHvW1o', N'F0lDegAn39', N'實際輔具補助費金額', N'', N'int', 1, N'', 56, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12587, N'7SvpWzMnRv', N'F0lDegAn39', N'營養品_媒體', N'', N'nvarchar(10)', 1, N'', 57, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12588, N'5SWQCctSal', N'F0lDegAn39', N'營養品單位數', N'', N'int', 1, N'', 58, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12589, N'kDFijpJe65', N'F0lDegAn39', N'營養品金額', N'', N'int', 1, N'', 59, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12590, N'3zyXYDl2jT', N'F0lDegAn39', N'實際營養品金額', N'', N'int', 1, N'', 60, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12591, N'dJRZPkkCYP', N'F0lDegAn39', N'學費補助費_媒體', N'', N'nvarchar(10)', 1, N'', 61, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12592, N'nfiALXZlZt', N'F0lDegAn39', N'學費補助費單位數', N'', N'int', 1, N'', 62, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12593, N'BZDpfSsTWj', N'F0lDegAn39', N'學費補助費金額', N'', N'int', 1, N'', 63, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12594, N'LkdzyeO6R1', N'F0lDegAn39', N'實際學費補助費金額', N'', N'int', 1, N'', 64, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12595, N'b4NFHwYiUR', N'F0lDegAn39', N'早療學費_媒體', N'', N'nvarchar(10)', 1, N'', 65, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12596, N'Ea7aISYkj8', N'F0lDegAn39', N'早療學費單位數', N'', N'int', 1, N'', 66, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12597, N'qwqDVZDXCE', N'F0lDegAn39', N'早療學費金額', N'', N'int', 1, N'', 67, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12598, N's2ZDvNqd91', N'F0lDegAn39', N'實際早療學費金額', N'', N'int', 1, N'', 68, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12599, N'lQ9xZZSv16', N'F0lDegAn39', N'臨托補助_媒體', N'', N'nvarchar(10)', 1, N'', 69, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12600, N'Aj46teNCUI', N'F0lDegAn39', N'臨托補助單位數', N'', N'int', 1, N'', 70, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12601, N'F5gj1TY3IX', N'F0lDegAn39', N'臨托補助金額', N'', N'int', 1, N'', 71, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12602, N'jkDHotX08d', N'F0lDegAn39', N'實際臨托補助金額', N'', N'int', 1, N'', 72, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12603, N'tQMypeTX2A', N'F0lDegAn39', N'醫療費用_媒體', N'', N'varchar(10)', 1, N'', 73, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12604, N'Jj6u2sXGMn', N'F0lDegAn39', N'醫療費用單位數', N'', N'int', 1, N'', 74, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12605, N'Gxdefj0qao', N'F0lDegAn39', N'醫療費用金額', N'', N'int', 1, N'', 75, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12606, N'GZl6lsXtB5', N'F0lDegAn39', N'實際醫療費用金額', N'', N'int', 1, N'', 76, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12607, N'hod6UiPOps', N'F0lDegAn39', N'托育養護_媒體', N'', N'varchar(10)', 1, N'', 77, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12608, N'fk5NiX9wXZ', N'F0lDegAn39', N'托育養護單位數', N'', N'int', 1, N'', 78, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12609, N'Xg1WQDWVfT', N'F0lDegAn39', N'托育養護金額', N'', N'int', 1, N'', 79, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12610, N'AZBxiJD3ke', N'F0lDegAn39', N'實際托育養護金額', N'', N'int', 1, N'', 80, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12611, N'bN6F1p9VpN', N'F0lDegAn39', N'學齡教育費_媒體', N'', N'varchar(10)', 1, N'', 81, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12612, N'znR5SI7o2Y', N'F0lDegAn39', N'學齡教育費單位數', N'', N'int', 1, N'', 82, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12613, N'UluivJpl4O', N'F0lDegAn39', N'學齡教育費金額', N'', N'int', 1, N'', 83, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12614, N'DJ4gzX81na', N'F0lDegAn39', N'實際學齡教育費金額', N'', N'int', 1, N'', 84, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12615, N'wULJPkNEOo', N'F0lDegAn39', N'就業扶助服務_媒體', N'', N'varchar(10)', 1, N'', 85, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12616, N'h44V3f0UoR', N'F0lDegAn39', N'就業扶助服務單位數', N'', N'int', 1, N'', 86, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12617, N'IvbSh2PW0P', N'F0lDegAn39', N'就業扶助服務金額', N'', N'int', 1, N'', 87, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12618, N'xCoJi4tIv0', N'F0lDegAn39', N'實際就業扶助服務金額', N'', N'int', 1, N'', 88, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12619, N'a1ss2tlnMz', N'F0lDegAn39', N'社區照顧_媒體', N'', N'varchar(10)', 1, N'', 89, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12620, N'YBgC0kWCH3', N'F0lDegAn39', N'社區照顧單位數', N'', N'int', 1, N'', 90, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12621, N'VHm9sI8fVN', N'F0lDegAn39', N'社區照顧金額', N'', N'int', 1, N'', 91, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12622, N'JekxTQaDU1', N'F0lDegAn39', N'實際社區照顧金額', N'', N'int', 1, N'', 92, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12623, N'h8IgpKmu4a', N'F0lDegAn39', N'其他_媒體', N'', N'varchar(10)', 1, N'', 93, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12624, N'OFIUuocqJS', N'F0lDegAn39', N'其他金額', N'', N'int', 1, N'', 94, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12625, N'UgmidycDdB', N'F0lDegAn39', N'其他單位數', N'', N'int', 1, N'', 95, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12626, N'N7rNmMlpJ3', N'F0lDegAn39', N'實際其他金額', N'', N'int', 1, N'', 96, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12627, N'RPZUmFMO2R', N'F0lDegAn39', N'狀態_補助申請_一階', N'', N'nvarchar(50)', 1, N'', 97, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12628, N'azFQqfRNVd', N'F0lDegAn39', N'退件原因_補助申請_一階', N'', N'nvarchar(1000)', 1, N'', 98, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12629, N'VyeZPGQfgp', N'F0lDegAn39', N'狀態_補助申請_二階', N'', N'nvarchar(50)', 1, N'', 99, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12630, N'e8r9mn8L28', N'F0lDegAn39', N'退件原因_補助申請_二階', N'', N'nvarchar(1000)', 1, N'', 100, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12631, N'kfGbaZ6RJd', N'F0lDegAn39', N'狀態_補助申請_三階', N'', N'nvarchar(50)', 1, N'', 101, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12632, N'bMGMm9QqiL', N'F0lDegAn39', N'退件原因_補助申請_三階', N'', N'nvarchar(1000)', 1, N'', 102, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12633, N'xlTQFfNyya', N'F0lDegAn39', N'狀態_資募_奶粉尿布', N'', N'nvarchar(50)', 1, N'', 103, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12634, N'FGJAQLEWeD', N'F0lDegAn39', N'退件原因_資募_奶粉尿布', N'', N'nvarchar(1000)', 1, N'', 104, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12635, N'1uExDhG87t', N'F0lDegAn39', N'狀態_資募_金錢支持', N'', N'nvarchar(50)', 1, N'', 105, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12636, N'Va7kOH5ES2', N'F0lDegAn39', N'退件原因_資募_金錢支持', N'', N'nvarchar(1000)', 1, N'', 106, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12637, N'7Pv6Ph1jzw', N'F0lDegAn39', N'狀態_資募_一階審核', N'', N'nvarchar(50)', 1, N'', 107, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12638, N'2N7IIORDsq', N'F0lDegAn39', N'退件原因_資募_一階審核', N'', N'nvarchar(1000)', 1, N'', 108, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12639, N'no973ewWzs', N'F0lDegAn39', N'狀態_金錢_一階審核', N'', N'nvarchar(50)', 1, N'', 109, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12640, N'R5u9iuA7K4', N'F0lDegAn39', N'退件原因_金錢_一階審核', N'', N'nvarchar(1000)', 1, N'', 110, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12641, N'WaMQdLCoTC', N'F0lDegAn39', N'狀態_資募_二階審核', N'', N'nvarchar(50)', 1, N'', 111, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12642, N'iKyNdWf0Pm', N'F0lDegAn39', N'退件原因_資募_二階審核', N'', N'nvarchar(1000)', 1, N'', 112, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12643, N'092ICMDWgk', N'F0lDegAn39', N'MEMO_LOG', N'', N'nvarchar(4000)', 0, N'', 113, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12644, N'o8LvY79n4F', N'F0lDegAn39', N'存入戶名', N'', N'nvarchar(50)', 1, N'', 114, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12645, N'0YcExKXJW7', N'F0lDegAn39', N'帳戶身份證字號', N'', N'nvarchar(50)', 1, N'', 115, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12646, N'gm1d8fUrRz', N'F0lDegAn39', N'存入分局代號', N'', N'nvarchar(50)', 1, N'', 116, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12647, N'vhhtaXxJ5F', N'F0lDegAn39', N'帳戶號碼', N'', N'nvarchar(50)', 1, N'', 117, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12648, N'SC38vxdWsA', N'F0lDegAn39', N'結案原因', N'', N'nvarchar(100)', 1, N'', 118, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12649, N'oOcmXlFsz9', N'pfvhYVf7QZ', N'資源開拓SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12650, N'lfLBB8McCD', N'pfvhYVf7QZ', N'專案開拓名稱', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12651, N'tFqbA07nr2', N'pfvhYVf7QZ', N'專案開拓編號', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12652, N'J9fsInZncY', N'pfvhYVf7QZ', N'預計開始日期', N'', N'smalldatetime', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12653, N'Kw3zTj8yoi', N'pfvhYVf7QZ', N'預計結束日期', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12654, N'kkSXc8jJZ7', N'pfvhYVf7QZ', N'需求人力', N'', N'int', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12655, N'hPGrHBPJMN', N'pfvhYVf7QZ', N'預計費用', N'', N'int', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12656, N'7rXEuq402F', N'pfvhYVf7QZ', N'支出', N'', N'int', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12657, N'QhksHmaAH6', N'pfvhYVf7QZ', N'收入', N'', N'int', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12658, N'5QxLTQiMBw', N'pfvhYVf7QZ', N'業績部門', N'', N'nvarchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12659, N'JL5bngxMT0', N'pfvhYVf7QZ', N'提報人', N'', N'nvarchar(50)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12660, N'gGf9gtQSaj', N'pfvhYVf7QZ', N'提報日', N'', N'smalldatetime', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12661, N'TCwZ7LJDwU', N'pfvhYVf7QZ', N'指定人員', N'', N'nvarchar(500)', 1, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12662, N'rxhygUfh6D', N'pfvhYVf7QZ', N'資源性質', N'', N'nvarchar(50)', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12663, N'oLr2kemnkI', N'pfvhYVf7QZ', N'不需審核', N'', N'nvarchar(50)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12664, N'SzXHdZaO5F', N'pfvhYVf7QZ', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12665, N'0nIPA4TeHU', N'vrg671yQ7G', N'資源開拓紀錄SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12666, N'CNR6bFH5Cj', N'vrg671yQ7G', N'資源開拓細目SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12667, N'0LSFq84HRP', N'vrg671yQ7G', N'日期', N'', N'smalldatetime', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12668, N'1GGBvzU6Nw', N'vrg671yQ7G', N'方式', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12669, N'DdLEs5TouS', N'vrg671yQ7G', N'對方回應', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12670, N'iAYo2SCDl7', N'vrg671yQ7G', N'摘要', N'', N'nvarchar(500)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12671, N'UfnrDb33u3', N'vrg671yQ7G', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12672, N'UGnWsQVBDj', N'7MaQYQCBvo', N'資源開拓細目SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12673, N'fCOzjBxsvA', N'7MaQYQCBvo', N'資源開拓SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12674, N'6UjShAsmt8', N'7MaQYQCBvo', N'客戶SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12675, N'7rnABSHoEy', N'7MaQYQCBvo', N'審核狀態', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12676, N'Enq43JKkx6', N'7MaQYQCBvo', N'開拓狀態', N'', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12677, N'0nCGgAR1UC', N'7MaQYQCBvo', N'備註', N'', N'nvarchar(100)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12678, N'KiOD1lmn9y', N'7MaQYQCBvo', N'開拓日期', N'', N'smalldatetime', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12679, N'rP6zgX665Y', N'7MaQYQCBvo', N'資源編號', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12680, N'tkH0o9rngB', N'bn5DjtU0UO', N'認養卡SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12681, N'VUHy9OcIvC', N'bn5DjtU0UO', N'PID', N'', N'varchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12682, N'dtxi8snrfZ', N'bn5DjtU0UO', N'愛心園丁編號', N'', N'varchar(50)', 1, N'', 3, N'', 1)
GO
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12683, N'28yF6a9xZh', N'bn5DjtU0UO', N'補助月份', N'', N'varchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12684, N'ePPjmsSHhL', N'bn5DjtU0UO', N'遲緩兒簡介', N'', N'varchar(500)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12685, N'UrcmkjOACC', N'bn5DjtU0UO', N'遲緩兒姓名', N'', N'varchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12686, N'S253goEkQ5', N'bn5DjtU0UO', N'性別', N'', N'varchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12687, N'Mr10j0T2Xk', N'bn5DjtU0UO', N'出生年月日', N'', N'datetime', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12688, N's0oRmq2O8R', N'bn5DjtU0UO', N'居住地', N'', N'varchar(100)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12689, N'WCEMShl8A4', N'bn5DjtU0UO', N'障礙類別', N'', N'varchar(50)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12690, N'a3bSEh2vGG', N'bn5DjtU0UO', N'障礙等級', N'', N'varchar(50)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12691, N'Qu4NDoXiXZ', N'xY5Xa5OA1y', N'認養信SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12692, N'DH11qt2DUN', N'xY5Xa5OA1y', N'PID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12693, N'U29lzObeeM', N'xY5Xa5OA1y', N'捐款人姓名', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12694, N'oJepoA7s3P', N'xY5Xa5OA1y', N'單項補助結案原因', N'', N'nvarchar(100)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12695, N'sn6UR6yiev', N'xY5Xa5OA1y', N'不補助的項目', N'', N'nvarchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12696, N'wPHEsSSxzN', N'xY5Xa5OA1y', N'登錄日期', N'', N'smalldatetime', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12697, N'Pq3hEBrzcI', N'1fUpE8S38b', N'障礙程度ID', N'', N'nvarchar(50)', 1, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12698, N'2DBUHONYBq', N'1fUpE8S38b', N'障礙程度', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12699, N'nzvlwAqTe9', N'1fUpE8S38b', N'ORDER1', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12700, N'g2r0qODzjH', N'VwrGe8rIqI', N'轉帳記錄SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12701, N'c4ZyXMORU8', N'VwrGe8rIqI', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12702, N'4XeJPadv7C', N'VwrGe8rIqI', N'T_PM_ID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12703, N'c64pZMGIih', N'VwrGe8rIqI', N'經辦人', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12704, N'xCAFQQmFwr', N'VwrGe8rIqI', N'轉帳日期', N'', N'smalldatetime', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12705, N'vWqhr2rpbx', N'VwrGe8rIqI', N'卡別', N'', N'nvarchar(50)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12706, N'tPNJTxbwSd', N'VwrGe8rIqI', N'受託局號', N'', N'nvarchar(50)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12707, N'SLLAdWQF4j', N'VwrGe8rIqI', N'撥款劃撥帳號', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12708, N'3ziZfuKQoO', N'VwrGe8rIqI', N'磁片檔', N'', N'nvarchar(50)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12709, N'hxy6OSHcVS', N'nc19PjV94C', N'轉帳記錄細目SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12710, N'QiV4ef5ibK', N'nc19PjV94C', N'轉帳記錄SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12711, N'oJGwRYqwrn', N'nc19PjV94C', N'補助申請SN', N'', N'int', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12712, N'tFeABh2qwb', N'AVQ3WJii71', N'贊助紀錄SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12713, N'lgCkeCkSCy', N'AVQ3WJii71', N'資源開拓細目SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12714, N'0nKwqBE2h0', N'AVQ3WJii71', N'日期', N'', N'smalldatetime', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12715, N'brYmpMzLCQ', N'AVQ3WJii71', N'WORK_ID', N'', N'nvarchar(50)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12716, N'kI8r9uPJHH', N'AVQ3WJii71', N'背景資料', N'', N'nvarchar(255)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12717, N'EkF0OzBor4', N'AVQ3WJii71', N'關係人背景摘記', N'', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12718, N'0rXTEwqDWq', N'AVQ3WJii71', N'過程摘記', N'', N'nvarchar(255)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12719, N'FEHKFMx4J7', N'AVQ3WJii71', N'主管初評', N'', N'nvarchar(50)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12720, N'Tor1yWPMqO', N'i645mWdUZ3', N'贊助紀錄細目SN', N'', N'int', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12721, N'czXfIjpikH', N'i645mWdUZ3', N'贊助紀錄SN', N'', N'int', 1, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12722, N'TCXiPpIB20', N'i645mWdUZ3', N'贊助項目ID', N'', N'nvarchar(50)', 1, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Sn], [Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (12723, N'fOZp7SjqBS', N'i645mWdUZ3', N'贊助數量', N'', N'int', 1, N'', 4, N'', 1)
SET IDENTITY_INSERT [dbo].[Column] OFF
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'2638sRu1lL', N'Db', N'Issue', N'問題維護', 1, N'select *
from dbo.Issue
ordre by Id', N'', 1, 1, 1, 1, 1, 1, 2, 1, CAST(N'2024-12-10T17:40:14.000' AS DateTime), CAST(N'2024-12-10T17:43:02.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5XDCQU13AA', N'Hr', N'UserExt', N'用戶學經歷維護', 1, N'select u.*, d.name as DeptName from [User] u
join [Dept] d on u.DeptId=d.Id
order by u.Id', N'', 0, 1, 0, 1, 0, 1, 1, 1, CAST(N'2020-12-12T19:18:07.000' AS DateTime), CAST(N'2021-01-20T18:09:39.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5Z5JPZR5HA', N'Hr', N'Leave', N'請假作業', 1, N'select l.* 
from Leave l
join [User] u on l.UserId=u.Id
join [User] u2 on l.AgentId=u2.Id
order by l.Id', N'', 1, 1, 1, 1, 0, 1, 1, 1, CAST(N'2021-02-18T01:11:15.000' AS DateTime), CAST(N'2021-02-20T11:53:27.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'D8J9A1MFLA', N'Db', N'Test', N'資料表維護2', 1, N'select 
    p.Code as ProjectCode, p.DbName,
    a.Code, a.Name, a.TranLog,
    '''' as _Fun, a.Status, 
    a.Id
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by a.Id desc', N'a', 1, 1, 1, 1, 0, 0, 0, 1, CAST(N'2022-01-20T11:10:47.000' AS DateTime), CAST(N'2022-01-20T15:25:28.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'D8JNSZN7YA', N'Db', N'Table2', N'資料表維護2', 1, N'select 
    p.Code as ProjectCode, p.DbName,
    a.Code, a.Name, a.TranLog,
    '''' as _Fun, a.Status, 
    a.Id
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by a.Id desc', N'', 1, 1, 1, 1, 0, 0, 0, 1, CAST(N'2022-01-20T16:11:25.000' AS DateTime), CAST(N'2022-05-06T00:18:24.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'kfNzZZsiGJ', N'vOKkUkVO2D', N'Issue', N'問題維護', 1, N'select *
from dbo.Issue
order by Id', N'', 1, 1, 1, 1, 0, 1, 0, 1, CAST(N'2025-05-22T14:33:54.000' AS DateTime), NULL)
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'r8laaNjIfg', N'n88VhVu7iY', N'Item', N'aa', 1, N'aa', N'', 1, 1, 1, 0, 1, 1, 0, 1, CAST(N'2025-05-28T10:19:55.000' AS DateTime), NULL)
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'RgOxvoVpND', N'Db', N'PrjProg', N'專案功能', 1, N'select * 
from dbo.PrjProg
order by Id', N'', 1, 1, 1, 1, 0, 0, 1, 1, CAST(N'2024-12-11T11:31:52.000' AS DateTime), NULL)
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'THpkzl0NDF', N'BaxZc0p1G9', N'Cloth', N'衣服基本資料維護', 1, N'select *
from dbo.Cloth
order by Id', N'', 1, 1, 1, 1, 0, 1, 0, 1, CAST(N'2025-05-04T19:19:13.000' AS DateTime), CAST(N'2025-05-07T00:00:19.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'ubA0PgrpvN', N'vOKkUkVO2D', N'Project', N'專案維護', 1, N'select *
from dbo.Project
order by Name', N'', 1, 1, 1, 1, 0, 0, 0, 1, CAST(N'2025-05-28T16:18:23.000' AS DateTime), NULL)
GO
SET IDENTITY_INSERT [dbo].[CrudEitem] ON 

INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (11, N'5XEYLM3KAA', N'5XEYLM3AWA', N'5XD29XD5LA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (12, N'5XEYLM3N0A', N'5XEYLM3AWA', N'5XD29XD72A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (13, N'5XEYNLFSBA', N'5XEYLM3AWA', N'5XD29XD8JA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (14, N'5XEYNLFW4A', N'5XEYLM3AWA', N'5XD29XDARA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (15, N'5XEYNLFXLA', N'5XEYLM3AWA', N'5XD29XDBYA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (16, N'5XEYNLFYVA', N'5XEYNLFBNA', N'5XD29XDDDA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (17, N'5XEYNLG0EA', N'5XEYNLFBNA', N'5XD29XDF1A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (18, N'5XEYNLG1MA', N'5XEYNLFBNA', N'5XD29XDGTA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (19, N'5XEYNLG31A', N'5XEYNLFBNA', N'5XD29XDKZA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (20, N'5XEYNLG4KA', N'5XEYNLFBNA', N'5XD29XDN0A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (21, N'5XEYNLG5VA', N'5XEYNLFBNA', N'5XD29XDPVA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (22, N'5XEYNLG7CA', N'5XEYNLFBNA', N'5XD29XDUAA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (23, N'5XEYNLG8MA', N'5XEYNLFBNA', N'5XD29XDVWA', N'INT', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (24, N'5XEYNLGA4A', N'5XEYNLFBNA', N'5XD29XDXPA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (25, N'5XEYNLGBGA', N'5XEYNLFBNA', N'5XD29XE1AA', N'MO', N'1000', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (26, N'5XEYURNH5A', N'5XEYURMVMA', N'5XD29XGNVA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (27, N'5XEYURNJEA', N'5XEYURMVMA', N'5XD29XGR4A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (28, N'5XEYURNKSA', N'5XEYURMVMA', N'5XD29XGSRA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (29, N'5XEYURNN1A', N'5XEYURMVMA', N'5XD29XGV8A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (30, N'5XEYURNQBA', N'5XEYURMVMA', N'5XD29XGWUA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (31, N'5XEYURNRRA', N'5XEYURMVMA', N'5XD29XGZGA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (32, N'5XEYURNSWA', N'5XEYURMVMA', N'5XD29XH1CA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (33, N'5XEYURNX4A', N'5XEYURN5GA', N'5XD29XE2UA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (34, N'5XEYURNZNA', N'5XEYURN5GA', N'5XD29XE9LA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (35, N'5XEYURP18A', N'5XEYURN5GA', N'5XD29XGACA', N'SO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (36, N'5XEYURP33A', N'5XEYURN5GA', N'5XD29XFPMA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (37, N'5XEYURP56A', N'5XEYURN5GA', N'5XD29XFX1A', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (38, N'5XEYURP6HA', N'5XEYURN5GA', N'5XD29XFZXA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (39, N'5XEYURP80A', N'5XEYURN5GA', N'5XD29XG6HA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (40, N'5XEYURP9NA', N'5XEYURN5GA', N'5XD29XG8HA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (41, N'5XEYURPBDA', N'5XEYURNAJA', N'5XD29XGC3A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (42, N'5XEYURPDTA', N'5XEYURNAJA', N'5XD29XGE9A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (43, N'5XEYURPFAA', N'5XEYURNAJA', N'5XD29XGG3A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (44, N'5XEYURPGVA', N'5XEYURNAJA', N'5XD29XGHSA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (45, N'5XEYURPN5A', N'5XEYURNAJA', N'5XD29XGKPA', N'F', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (46, N'5XEYURPPJA', N'5XEYURNC2A', N'5XD29XH4HA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (47, N'5XEYURPQVA', N'5XEYURNC2A', N'5XD29XH6EA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (48, N'5XEYURPT8A', N'5XEYURNC2A', N'5XD29XHC2A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (49, N'5XEYURPWGA', N'5XEYURNC2A', N'5XD29XH8EA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (50, N'5XEYURPYZA', N'5XEYURNC2A', N'5XD29XHA2A', N'TA', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (51, N'5XLQA0CC6A', N'5XEYURNC2A', N'5XLQ99LV9A', N'SO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (52, N'5Z642A9Q8A', N'5Z642A9LLA', N'5Z5BHXMCMA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (53, N'5Z642A9QYA', N'5Z642A9LLA', N'5Z5BHXME5A', N'S', N'Users', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (54, N'5Z642A9RUA', N'5Z642A9LLA', N'5Z5BHXMFJA', N'S', N'Users', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (55, N'5Z642A9T0A', N'5Z642A9LLA', N'5Z5BHXMGLA', N'S', N'LeaveTypes', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (56, N'5Z642A9TYA', N'5Z642A9LLA', N'5Z5BHXMJ7A', N'DT', N'', 1, 1, 1, N'', N'', N'', N'2,4', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (57, N'5Z642A9ULA', N'5Z642A9LLA', N'5Z5BHXMKSA', N'DT', N'', 1, 1, 1, N'', N'', N'', N'2,4', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (58, N'5Z642A9VKA', N'5Z642A9LLA', N'5Z5BHXMM5A', N'DEC', N'', 1, 1, 1, N'', N'', N'', N'2,1', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (59, N'5Z642A9XHA', N'5Z642A9LLA', N'5Z5BHXMS5A', N'RO', N'FlowSignStatusName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (60, N'5Z642A9YGA', N'5Z642A9LLA', N'5Z5BHXMU0A', N'C', N'啟用', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (61, N'5Z642A9ZHA', N'5Z642A9LLA', N'5Z5BHXMVTA', N'RO', N'CreatorName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (62, N'5Z642AA1FA', N'5Z642A9LLA', N'5Z5BHXMXVA', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 10)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (63, N'5Z642AA2HA', N'5Z642A9LLA', N'5Z5BHXMZRA', N'RO', N'ReviserName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 11)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (64, N'5Z642AA37A', N'5Z642A9LLA', N'5Z5BHXN1KA', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 12)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (65, N'D8J9A1TH3A', N'D8J9A1SKGA', N'5X9RB3GPHA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (66, N'D8J9A1TZHA', N'D8J9A1SKGA', N'5X9RB3GRZA', N'S', N'Projects', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (67, N'D8J9A1ULAA', N'D8J9A1SKGA', N'5YFVJXCCVA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (68, N'D8J9A1UXFA', N'D8J9A1SKGA', N'5X9RB3GT3A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (69, N'D8J9A1VD2A', N'D8J9A1SKGA', N'D58FUTT5TA', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (70, N'D8J9A1VVNA', N'D8J9A1SKGA', N'5X9RB3GZ3A', N'C', N'啟用', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (71, N'D8J9A1WAHA', N'D8J9A1T1AA', N'5X9RB37ZKA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (72, N'D8J9A1WRSA', N'D8J9A1T1AA', N'5X9RB381FA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (73, N'D8J9A1X7LA', N'D8J9A1T1AA', N'5YFVJXBYXA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (74, N'D8J9A1XP4A', N'D8J9A1T1AA', N'5X9RB3845A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (75, N'D8J9A1Y4LA', N'D8J9A1T1AA', N'5X9RB3890A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (76, N'D8J9A1YL9A', N'D8J9A1T1AA', N'5X9RB38APA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (77, N'D8J9A1Z1FA', N'D8J9A1T1AA', N'5X9RB38E9A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (78, N'D8J9A1ZHGA', N'D8J9A1T1AA', N'5X9RB38G3A', N'INT', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (79, N'D8J9A1ZZCA', N'D8J9A1T1AA', N'5X9RB38HTA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (80, N'D8J9A20FPA', N'D8J9A1T1AA', N'5X9RB38KTA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (81, N'D8JNSZTP0A', N'D8JNSZSWHA', N'5X9RB3GPHA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (82, N'D8JNSZU55A', N'D8JNSZSWHA', N'5X9RB3GRZA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (83, N'D8JNSZUNGA', N'D8JNSZSWHA', N'5YFVJXCCVA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (84, N'D8JNSZV2FA', N'D8JNSZSWHA', N'5X9RB3GT3A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (85, N'D8JNSZVJXA', N'D8JNSZSWHA', N'D58FUTT5TA', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (86, N'D8JNSZW0MA', N'D8JNSZSWHA', N'5X9RB3GZ3A', N'C', N'正常', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (87, N'D8JNSZWECA', N'D8JNSZT7JA', N'5X9RB37ZKA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (88, N'D8JNSZWXHA', N'D8JNSZT7JA', N'5X9RB381FA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (89, N'D8JNSZXAKA', N'D8JNSZT7JA', N'5YFVJXBYXA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (90, N'D8JNSZXS2A', N'D8JNSZT7JA', N'5X9RB3845A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (91, N'D8JNSZY7TA', N'D8JNSZT7JA', N'5X9RB3890A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (92, N'D8JNSZYP2A', N'D8JNSZT7JA', N'5X9RB38APA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (93, N'D8JNSZZ72A', N'D8JNSZT7JA', N'5X9RB38E9A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (94, N'D8JNSZZNVA', N'D8JNSZT7JA', N'5X9RB38G3A', N'INT', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (95, N'D8JNT002PA', N'D8JNSZT7JA', N'5X9RB38HTA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (96, N'D8JNT00JHA', N'D8JNSZT7JA', N'5X9RB38KTA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3105, N'x2cdkvRX5g', N'lWoB2wEvK1', N'lrxkoVuL9N', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3106, N'ot62i29tal', N'lWoB2wEvK1', N'qH3wMFow2l', N'S', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3107, N'ZhXMgI1Lts', N'lWoB2wEvK1', N'toPiQ9D3zx', N'S', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3108, N'W4RHC5TRbE', N'lWoB2wEvK1', N'08XKCcU7cs', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3109, N'evp0VusUii', N'lWoB2wEvK1', N'GgRiWW7KxW', N'S', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3110, N'CvNnMAzJeL', N'lWoB2wEvK1', N'e4y7hfjkGv', N'TA', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3111, N'DeUhXQREW3', N'lWoB2wEvK1', N'T8nJiW3G0b', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3112, N'nqwq5WRmrk', N'lWoB2wEvK1', N'exN2k1hrQS', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3113, N'tq8Afwn7tO', N'lWoB2wEvK1', N'oKTK9qHW1J', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3114, N'SzoKEUyvgg', N'lWoB2wEvK1', N'O6vOCd8tj5', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3115, N'4xzrTORyaC', N'dOAxtyUcfO', N'HMDffuFGit', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3116, N'qeVDkvOXti', N'dOAxtyUcfO', N'OcKm24vGQc', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3117, N'IZKxa6rySE', N'dOAxtyUcfO', N'1Qe0r0bz7X', N'S', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
GO
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3118, N'l9DSh1426K', N'dOAxtyUcfO', N'9prI7l2STu', N'INT', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3119, N'U1oA4f28uL', N'dOAxtyUcfO', N'TYMsC4v2p9', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3120, N'eimd7fAYyq', N'3Wp10Y8uxn', N'lYbisE0naG', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3121, N'zrbYqTSz23', N'3Wp10Y8uxn', N'tein3BWe00', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3122, N'MedDvUepT6', N'3Wp10Y8uxn', N'Ku325lVSq4', N'S', N'GendersA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3128, N'j0oVys5E02', N'3Wp10Y8uxn', N'n1shEKha5h', N'F', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3129, N'SKmNlPNWPc', N'3Wp10Y8uxn', N'viAEJIEDhv', N'F', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3130, N'U94Uys6Vaz', N'3Wp10Y8uxn', N'NWebwpAFa7', N'F', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3131, N'Q11v5vC8Kb', N'3Wp10Y8uxn', N'noajKgDKgP', N'S', N'ClothTypesA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3132, N'BbMcU5gUzi', N'3Wp10Y8uxn', N'EAxeJUrdVX', N'S', N'SizeTypesA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3133, N'OD2GYFzLQy', N'3Wp10Y8uxn', N'33Pv2i9K4n', N'S', N'StyleTypesA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3134, N'P0QAHvo5M3', N'3Wp10Y8uxn', N'vXM77MAKLw', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3135, N'ql5IyIkMDM', N'3Wp10Y8uxn', N'Fa6CYCrbDJ', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 10)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3136, N'KquZNXYEgE', N'3Wp10Y8uxn', N'EHI77eiJ4H', N'DEC', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 11)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3137, N'LN8CU7az0v', N'3Wp10Y8uxn', N'oR2hF5EcFy', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 12)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3138, N'cp1SnIqGj5', N'3Wp10Y8uxn', N'xVN3OdGm3y', N'S', N'ClothStatusesA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 13)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3139, N'DNhGCOdglR', N'3Wp10Y8uxn', N'9y7F7BdNcx', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 14)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3140, N'eRgoNNy296', N'3Wp10Y8uxn', N'UoG8ixXkRB', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 15)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3141, N'rl7sQqi74e', N'3Wp10Y8uxn', N'LTV8VBhGg6', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 16)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3142, N'O0yqxvMt9N', N'3Wp10Y8uxn', N'ZTiiSAMDgv', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 17)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3143, N'hBflj71N6g', N'vKc6iFFxoL', N'6EG4W334t6', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3144, N'Sc3FXseqHI', N'vKc6iFFxoL', N'qv2DexyWNk', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3145, N'fRp1jUx9s9', N'vKc6iFFxoL', N'PpZK5J0tmW', N'S', N'ProjectA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3146, N'VEAgV0QqqJ', N'vKc6iFFxoL', N'jJd4xs2rOw', N'S', N'UserA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3147, N'aTHofr5ifa', N'vKc6iFFxoL', N'eiHtMj6Wq2', N'S', N'UserA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3148, N'OwYx1MvEBr', N'vKc6iFFxoL', N'QFfPVWt5tG', N'S', N'IssueTypeA', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3149, N'ncpMqUB6sd', N'vKc6iFFxoL', N'iFzpUbR2YH', N'INT', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3150, N'zmanZpqTVH', N'vKc6iFFxoL', N'bAU9GVpXi5', N'TA', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3151, N'uN9w1b8vOC', N'vKc6iFFxoL', N'Av4GzYn1vy', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3152, N'QhHk8U7DJC', N'vKc6iFFxoL', N'KJXFy7pnwX', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3153, N'POFyvH81rl', N'vKc6iFFxoL', N'QwetdFqI3t', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 10)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3154, N'Zh5CPhanal', N'vKc6iFFxoL', N'pniKH6welO', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 11)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3155, N'lmTIzhBDvO', N'vKc6iFFxoL', N'TVphTLdHaH', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 12)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3156, N'McftTgV55K', N'vKc6iFFxoL', N'hDne7MLwaz', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 13)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3157, N'qIMOMzPbSz', N'vKc6iFFxoL', N'NGC3FFHF5n', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 14)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (3158, N'Xr7Azvnxkp', N'vKc6iFFxoL', N'fSgRhH7qVi', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 15)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4143, N'Xxe6NYh6xz', N'9mmHvENh0I', N'jJOCKXcHpx', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4144, N'dMIbGQTko8', N'9mmHvENh0I', N's5d6lIRnOj', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4145, N'Vzizlb7xSB', N'9mmHvENh0I', N'fDLwmsCLne', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4146, N'89CeVLAV5J', N'9mmHvENh0I', N'MyF62aQ96b', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4147, N'nRueCXxobF', N'MRzw9JzOl6', N'PQQFQs5sEl', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4148, N'pMntFJLrlC', N'MRzw9JzOl6', N'zgluqOosUA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4149, N'KByqQqJckd', N'MRzw9JzOl6', N'906Gmnbdnt', N'C', N'是', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4150, N'4sK3astB9A', N'MRzw9JzOl6', N'3lLtHWcb4r', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Sn], [Id], [EtableId], [ColumnId], [EitemType], [ItemData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (4151, N'XAmqh4wqw8', N'MRzw9JzOl6', N'l36hSvikQO', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
SET IDENTITY_INSERT [dbo].[CrudEitem] OFF
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'3Wp10Y8uxn', N'THpkzl0NDF', N'mOOH7SiWrZ', N'Id', N'', N'1', N'', 0, 0, N'')
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYLM3AWA', N'5XDCQU13AA', N'5XD29XC3BA', N'Id', N'', N'0', N'', 0, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYNLFBNA', N'5XDCQU13AA', N'5XD29XC6LA', N'Id', N'UserId', N'0', N'', 2, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURMVMA', N'5XDCQU13AA', N'5XD29XCAWA', N'Id', N'UserId', N'0', N'', 1, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURN5GA', N'5XDCQU13AA', N'5XD29XC7WA', N'Id', N'UserId', N'0', N'Sort', 3, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURNAJA', N'5XDCQU13AA', N'5XD29XC9AA', N'Id', N'UserId', N'0', N'', 4, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5XEYURNC2A', N'5XDCQU13AA', N'5XD29XCDPA', N'Id', N'UserId', N'0', N'', 5, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'5Z642A9LLA', N'5Z5JPZR5HA', N'5Z5BHXK86A', N'Id', N'', N'1', N'', 0, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'9mmHvENh0I', N'r8laaNjIfg', N'B6kjooWPf0', N'aa', N'', N'0', N'', 0, 0, N'')
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8J9A1SKGA', N'D8J9A1MFLA', N'5X9RB373ZA', N'Id', N'', N'0', N'', 0, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8J9A1T1AA', N'D8J9A1MFLA', N'5X9RB36MYA', N'Id', N'TableId', N'0', N'', 1, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8JNSZSWHA', N'D8JNSZN7YA', N'5X9RB373ZA', N'Id', N'', N'0', N'', 0, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'D8JNSZT7JA', N'D8JNSZN7YA', N'5X9RB36MYA', N'Id', N'TableId', N'0', N'', 1, 0, NULL)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'dOAxtyUcfO', N'RgOxvoVpND', N'3DgSQnx0Wz', N'Id', N'', N'0', N'', 0, 0, N'')
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'lWoB2wEvK1', N'2638sRu1lL', N'oOG6kwUBcT', N'Id', N'', N'1', N'Id', 0, 0, N'')
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'MRzw9JzOl6', N'ubA0PgrpvN', N'R66qCuquX5', N'Id', N'', N'0', N'', 0, 0, N'')
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [PkeyFid], [FkeyFid], [Col4], [OrderBy], [Sort], [HalfWidth], [AutoIdLen]) VALUES (N'vKc6iFFxoL', N'kfNzZZsiGJ', N'Pcc3x8gEUv', N'Id', N'', N'1', N'', 0, 0, N'')
GO
SET IDENTITY_INSERT [dbo].[CrudQitem] ON 

INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (2, N'5XDCQUBPRA', N'5XDCQU13AA', N'5XD29XD72A', N'', N'T', N'', N'Like', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (3, N'5XDCS43M4A', N'5XDCQU13AA', N'5XD29XD8JA', N'', N'T', N'', N'Like', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (4, N'5XDCS43PJA', N'5XDCQU13AA', N'5XD29XDARA', N'', N'S', N'Depts', N'Equal', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (5, N'5Z5ZUACK6A', N'5Z5JPZR5HA', N'5Z5BHXMGLA', N'', N'S', N'LeaveTypes', N'Equal', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (6, N'5Z5ZUACL6A', N'5Z5JPZR5HA', N'5Z5BHXMS5A', N'', N'S', N'SignStatuses', N'Equal', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (7, N'5Z87DRL40A', N'5Z5JPZR5HA', N'5Z5BHXMJ7A', N'', N'D', N'', N'InRange', 1, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (8, N'D8J9A1MWSA', N'D8J9A1MFLA', N'5X9RB3GRZA', N'', N'S', N'Projects', N'Equal', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (9, N'D8J9A1NEQA', N'D8J9A1MFLA', N'5YFVJXCCVA', N'', N'T', N'', N'Like', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (10, N'D8J9A1NUSA', N'D8J9A1MFLA', N'5X9RB3GT3A', N'', N'T', N'', N'Like', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (11, N'D8JEACLSTA', N'D8J9A1MFLA', N'D58FUTT5TA', N'', N'S', N'YesNos', N'Equal', 0, 0, N'', N'', 3)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (12, N'D8JNSZNM8A', N'D8JNSZN7YA', N'5X9RB3GRZA', N'', N'S', N'Projects', N'Equal', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (13, N'D8JNSZP38A', N'D8JNSZN7YA', N'5YFVJXCCVA', N'', N'T', N'', N'Like', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (14, N'D8JNSZPJJA', N'D8JNSZN7YA', N'5X9RB3GT3A', N'', N'T', N'', N'Like', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (15, N'D8JNSZQ05A', N'D8JNSZN7YA', N'D58FUTT5TA', N'', N'S', N'YesNos', N'Equal', 0, 0, N'', N'', 3)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1022, N'XqUYI5eki2', N'2638sRu1lL', N'qH3wMFow2l', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1023, N'4Rk2YOj6PY', N'2638sRu1lL', N'toPiQ9D3zx', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1024, N'TdYK7irH8u', N'2638sRu1lL', N'GgRiWW7KxW', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1025, N'CxG0YN0aH0', N'2638sRu1lL', N'08XKCcU7cs', N'', N'T', N'', N'Like2', 0, 0, N'', N'', 3)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1026, N'Ycc3TusGnI', N'2638sRu1lL', N'T8nJiW3G0b', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 4)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1027, N'wPtvUH6Mwr', N'RgOxvoVpND', N'OcKm24vGQc', N'', N'T', N'', N'Like2', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1028, N'KsAnSwALYl', N'RgOxvoVpND', N'1Qe0r0bz7X', N'', N'S', N'', N'Equal', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1031, N'dT8sn2b0Y7', N'THpkzl0NDF', N'tein3BWe00', N'', N'T', N'', N'Like2', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1032, N'jzbwY4nw90', N'THpkzl0NDF', N'Ku325lVSq4', N'', N'S', N'GendersA', N'Equal', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1033, N'OodsAYrZrj', N'THpkzl0NDF', N'noajKgDKgP', N'', N'S', N'ClothTypesA', N'Equal', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1034, N'omfy1SdTRN', N'THpkzl0NDF', N'EAxeJUrdVX', N'', N'S', N'SizeTypesA', N'Equal', 0, 0, N'', N'', 3)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1035, N'yzd0SFX5k6', N'THpkzl0NDF', N'33Pv2i9K4n', N'', N'S', N'StyleTypesA', N'Equal', 0, 0, N'', N'', 4)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1036, N'01XJjmUfoy', N'THpkzl0NDF', N'EHI77eiJ4H', N'', N'DEC', N'', N'InRange', 0, 0, N'', N'', 6)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1037, N'5hbDap4U5w', N'THpkzl0NDF', N'xVN3OdGm3y', N'', N'S', N'ClothStatusesA', N'Equal', 0, 0, N'', N'', 5)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1038, N'q3PkUaddCc', N'kfNzZZsiGJ', N'qv2DexyWNk', N'', N'T', N'', N'Like2', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1039, N'V5F78J6ct9', N'kfNzZZsiGJ', N'PpZK5J0tmW', N'', N'S', N'ProjectA', N'Equal', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1040, N'RaiLsUzyD1', N'kfNzZZsiGJ', N'jJd4xs2rOw', N'', N'S', N'UserA', N'Equal', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1041, N'qw9zcoRsrO', N'kfNzZZsiGJ', N'eiHtMj6Wq2', N'', N'S', N'UserA', N'Equal', 0, 0, N'', N'', 3)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1042, N'6a0SsY4iVf', N'kfNzZZsiGJ', N'Av4GzYn1vy', N'', N'T', N'', N'Equal', 0, 0, N'', N'', 4)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1043, N'EpUTkwTcMF', N'kfNzZZsiGJ', N'KJXFy7pnwX', N'', N'S', N'YesNo', N'Equal', 0, 0, N'', N'', 5)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (1044, N'TOwoF8OLkl', N'kfNzZZsiGJ', N'QwetdFqI3t', N'', N'S', N'YesNo', N'Equal', 0, 0, N'', N'', 6)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (2022, N'Vp23Ep2n2l', N'r8laaNjIfg', N'jJOCKXcHpx', N'', N'T', N'', N'Equal', 0, 0, N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (2023, N'JNflAP4Ig9', N'r8laaNjIfg', N's5d6lIRnOj', N'', N'T', N'', N'Equal', 0, 0, N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (2024, N'UswLkDNiAE', N'r8laaNjIfg', N'fDLwmsCLne', N'', N'T', N'', N'Equal', 0, 0, N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (2025, N'yUfO8cHDja', N'r8laaNjIfg', N'MyF62aQ96b', N'', N'T', N'', N'Equal', 0, 0, N'', N'', 3)
INSERT [dbo].[CrudQitem] ([Sn], [Id], [CrudId], [ColumnId], [TableAs], [QitemType], [ItemData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [Sort]) VALUES (2026, N'EdqsKCsrYM', N'ubA0PgrpvN', N'zgluqOosUA', N'', N'T', N'', N'Like2', 0, 0, N'', N'', 0)
SET IDENTITY_INSERT [dbo].[CrudQitem] OFF
GO
SET IDENTITY_INSERT [dbo].[CrudRitem] ON 

INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (8, N'5XEXK6A9SA', N'5XDCQU13AA', N'Account', N'帳號', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (9, N'5XEXK6ASFA', N'5XDCQU13AA', N'Name', N'使用者名稱', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (10, N'5XEXK6B26A', N'5XDCQU13AA', N'DeptName', N'部門', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (11, N'5XEXK6B5MA', N'5XDCQU13AA', N'Status', N'資料狀態', 0, N'SS', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (12, N'5XEXK6B9RA', N'5XDCQU13AA', N'_Fun', N'維護', 0, N'CF', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (13, N'5Z5ZUACLWA', N'5Z5JPZR5HA', N'UserId', N'請假人', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (14, N'5Z5ZUACMUA', N'5Z5JPZR5HA', N'AgentId', N'代理人', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (15, N'5Z5ZUACP0A', N'5Z5JPZR5HA', N'LeaveType', N'假別', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (16, N'5Z5ZUACPQA', N'5Z5JPZR5HA', N'StartTime', N'開始時間', 0, N'DT', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (17, N'5Z5ZUACQUA', N'5Z5JPZR5HA', N'EndTime', N'結束時間', 0, N'DT', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (18, N'5Z5ZUACRPA', N'5Z5JPZR5HA', N'Hours', N'請假時數', 0, N'0', 5)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (19, N'5Z5ZUACTKA', N'5Z5JPZR5HA', N'FlowSignStatus', N'流程簽核狀態', 0, N'0', 6)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (20, N'5Z5ZUACUHA', N'5Z5JPZR5HA', N'Created', N'Created', 0, N'DT', 7)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (21, N'D8J9A1PT9A', N'D8J9A1MFLA', N'ProjectCode', N'專案', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (22, N'D8J9A1Q72A', N'D8J9A1MFLA', N'Code', N'資料表代碼', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (23, N'D8J9A1QPKA', N'D8J9A1MFLA', N'Name', N'資料表名稱', 0, N'0', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (24, N'D8J9A1R5AA', N'D8J9A1MFLA', N'TranLog', N'是否記錄交易', 0, N'YE', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (25, N'D8J9A1RMEA', N'D8J9A1MFLA', N'_Fun', N'維護', 0, N'CF', 5)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (26, N'D8J9A1S3AA', N'D8J9A1MFLA', N'Status', N'資料狀態', 0, N'SN', 6)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (27, N'D8JAARUJEA', N'D8J9A1MFLA', N'DbName', N'資料庫', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (28, N'D8JNSZQGBA', N'D8JNSZN7YA', N'ProjectCode', N'專案Id', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (29, N'D8JNSZQZ8A', N'D8JNSZN7YA', N'Code', N'資料表代碼', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (30, N'D8JNSZRD6A', N'D8JNSZN7YA', N'Name', N'資料表名稱', 0, N'0', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (31, N'D8JNSZRV4A', N'D8JNSZN7YA', N'TranLog', N'是否記錄交易', 0, N'YE', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (32, N'D8JNSZSBAA', N'D8JNSZN7YA', N'Status', N'資料狀態', 0, N'SN', 6)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (33, N'D8JPP0VNCA', N'D8JNSZN7YA', N'DbName', N'資料庫名稱', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (34, N'D8JPP0W6JA', N'D8JNSZN7YA', N'_Fun', N'維護', 0, N'CF', 5)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3042, N'KtR7xL0cuW', N'2638sRu1lL', N'Id', N'Id', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3043, N'cH0jUxIWHq', N'2638sRu1lL', N'ProgId', N'功能', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3044, N'uhI32dA4YK', N'2638sRu1lL', N'OwnerId', N'擁有者', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3045, N'lYcwPni4wB', N'2638sRu1lL', N'Title', N'Title', 0, N'0', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3046, N'v67CMOihaT', N'2638sRu1lL', N'IssueType', N'資料種類', 0, N'0', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3047, N'QETKb1JuCd', N'2638sRu1lL', N'Creator', N'建檔人員', 0, N'0', 5)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3048, N'j842mikfO2', N'2638sRu1lL', N'Reviser', N'修改人員', 0, N'0', 6)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3049, N'Kf9wNOsrwH', N'RgOxvoVpND', N'Name', N'功能名稱', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3050, N'crZ1G6kuii', N'RgOxvoVpND', N'ProjectId', N'專案', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3051, N'8DjyNemrbr', N'RgOxvoVpND', N'Sort', N'排序', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3052, N'aFrbpjrAZ1', N'RgOxvoVpND', N'Status', N'狀態', 0, N'SN', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3053, N'vFblllhsm0', N'RgOxvoVpND', N'_fun', N'功能', 0, N'CF', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3054, N'jvyBir2STy', N'THpkzl0NDF', N'Name', N'名稱', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3055, N'vVMOR9x0Qw', N'THpkzl0NDF', N'Gender', N'性別種類', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3056, N'R7eJqkDiQh', N'THpkzl0NDF', N'Photo1', N'圖檔1', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3057, N'NHeDF0ozRd', N'THpkzl0NDF', N'ClothType', N'服飾種類', 0, N'0', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3058, N'hp3KNUYwEu', N'THpkzl0NDF', N'SizeType', N'尺寸', 0, N'0', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3059, N'IqPiVyVfrR', N'THpkzl0NDF', N'StyleType', N'風格', 0, N'0', 5)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3060, N'AszJCjpAX0', N'THpkzl0NDF', N'Color', N'顏色', 0, N'0', 6)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3061, N'nvJlqC3w2S', N'THpkzl0NDF', N'Material', N'材質', 0, N'0', 7)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3062, N'XDHQiUMsGZ', N'THpkzl0NDF', N'Price', N'售價', 0, N'0', 8)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3063, N'YuiueXpcOf', N'THpkzl0NDF', N'ListTime', N'上架時間', 0, N'0', 9)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3064, N'sxWCZMjeBZ', N'THpkzl0NDF', N'ClothStatus', N'資料狀態', 0, N'0', 10)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3065, N'NoZDzBcM3p', N'THpkzl0NDF', N'Created', N'建檔時間', 0, N'0', 11)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3066, N'rgJ4w3WB5i', N'THpkzl0NDF', N'_Fun', N'功能', 80, N'CF', 12)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3067, N'3Rhd8nF4dn', N'kfNzZZsiGJ', N'Title', N'標題', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3068, N'GnFwQAlpxN', N'kfNzZZsiGJ', N'ProjectId', N'專案', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3069, N'O2cr2A6vHt', N'kfNzZZsiGJ', N'RptUserId', N'回報人員', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3070, N'2N6WQTexcJ', N'kfNzZZsiGJ', N'OwnerId', N'處理人員', 0, N'0', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3071, N'e3iOkav8f7', N'kfNzZZsiGJ', N'IssueType', N'問題類別', 0, N'0', 4)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3072, N'qqVuofMGS5', N'kfNzZZsiGJ', N'WorkHours', N'工時', 0, N'0', 5)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3073, N'LMqWqPRE32', N'kfNzZZsiGJ', N'ToVer', N'寫入版本', 0, N'0', 6)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3074, N'LwRNFBOA1j', N'kfNzZZsiGJ', N'IsFirst', N'優先處理', 0, N'0', 7)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3075, N'bhc9dn4he0', N'kfNzZZsiGJ', N'IsFinish', N'已結案', 0, N'0', 8)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3076, N'JpPIsxeKzE', N'kfNzZZsiGJ', N'Creator', N'建檔人員', 0, N'0', 9)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (3077, N'TKScF7NDbP', N'kfNzZZsiGJ', N'Created', N'建檔日期', 0, N'0', 10)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4042, N'zzLQkxCahi', N'r8laaNjIfg', N'Id', N'Id', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4043, N'GMSMmrYL90', N'r8laaNjIfg', N'No', N'No', 0, N'0', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4044, N'RxlR5wBZ7g', N'r8laaNjIfg', N'Name', N'Name', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4045, N'QsunegX3FG', N'r8laaNjIfg', N'ItemType', N'ItemType', 0, N'0', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4046, N'uzotSty9Lj', N'ubA0PgrpvN', N'Name', N'專案名稱', 0, N'0', 0)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4047, N'5DUvHiaUdz', N'ubA0PgrpvN', N'Status', N'啟用', 0, N'YE', 1)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4048, N'k6NCjhfAIR', N'ubA0PgrpvN', N'Creator', N'建檔人員', 0, N'0', 2)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4049, N'PuIpdcBeX9', N'ubA0PgrpvN', N'Created', N'建檔日期', 0, N'0', 3)
INSERT [dbo].[CrudRitem] ([Sn], [Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [Sort]) VALUES (4050, N'pFDDVrmHxG', N'ubA0PgrpvN', N'_Fun', N'功能', 0, N'CF', 4)
SET IDENTITY_INSERT [dbo].[CrudRitem] OFF
GO
SET IDENTITY_INSERT [dbo].[DataDict] ON 

INSERT [dbo].[DataDict] ([Sn], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Note], [TableType]) VALUES (1, N'Id', N'Id', N'varchar(10)', 0, N'', N'主Key欄位', N'Base')
SET IDENTITY_INSERT [dbo].[DataDict] OFF
GO
SET IDENTITY_INSERT [dbo].[Issue] ON 

INSERT [dbo].[Issue] ([Sn], [Id], [zz_ProjectId], [ProgId], [OwnerId], [IssueType], [WorkDate], [WorkHours], [Title], [Note], [IsFinish], [RptDeptCode], [RptDeptId], [RptUser], [RptType], [SendTimes], [Creator], [Created], [Reviser], [Revised]) VALUES (1, N'AwwQVmNGQ7', N'bu040syNlI', N'T6eAWTQc8M', N'Bruce', N'R', CAST(N'2025-02-03T00:00:00' AS SmallDateTime), 1, N'test1', N'test1', 1, N'', NULL, N'', N'', 0, N'Bruce', CAST(N'2025-02-03T08:51:54.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Issue] ([Sn], [Id], [zz_ProjectId], [ProgId], [OwnerId], [IssueType], [WorkDate], [WorkHours], [Title], [Note], [IsFinish], [RptDeptCode], [RptDeptId], [RptUser], [RptType], [SendTimes], [Creator], [Created], [Reviser], [Revised]) VALUES (2, N'rJYWPDoqYz', NULL, N'aNLIg5iLr3', N'Bruce', N'R', CAST(N'2025-02-03T00:00:00' AS SmallDateTime), 1, N'工作日誌系統閒置過久必須重新登入', N'test', 1, N'', NULL, N'14700', N'', 3, N'Bruce', CAST(N'2025-02-03T13:47:42.000' AS DateTime), N'Bruce', CAST(N'2025-03-19T18:44:18.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Issue] OFF
GO
SET IDENTITY_INSERT [dbo].[IssueFile] ON 

INSERT [dbo].[IssueFile] ([Sn], [Id], [IssueId], [FileName], [Creator], [Created]) VALUES (1, N'borCKm5ANt', N'Ga0KfnbQNq', N'遊樂場地圖.png', N'Bruce', CAST(N'2024-12-12T11:00:56.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[IssueFile] OFF
GO
INSERT [dbo].[PrjProg] ([Id], [Name], [ProjectId], [Sort], [Status], [Creator]) VALUES (N'aNLIg5iLr3', N'test1', N'Db', 1, 1, N'Bruce')
INSERT [dbo].[PrjProg] ([Id], [Name], [ProjectId], [Sort], [Status], [Creator]) VALUES (N'T6eAWTQc8M', N'功能1', N'bu040syNlI', 1, 1, N'Bruce')
GO
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'BaxZc0p1G9', N'二手衣管理系統', N'Cloth2Adm', N'Cloth2', 0, N'c:\_project\Cloth2Adm', N'data source=.\SQLExpress;initial catalog=Cloth2;integrated security=True;multipleactiveresultsets=True;TrustServerCertificate=true;', 1, 0, N'Bruce', CAST(N'2025-05-03T15:25:45.000' AS DateTime), N'Bruce', CAST(N'2025-05-19T15:55:50.000' AS DateTime))
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'D58WWHCYQA', N'尋寶', N'BaoAdm', N'Bao', 0, N'd:\_project\BaoAdm', N'data source=(localdb)\mssqllocaldb;initial catalog=Bao;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1, 0, N'Bruce', CAST(N'2024-11-01T14:29:48.253' AS DateTime), NULL, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'Db', N'DbAdm資料庫文件', N'DbAdm', N'Db', 0, N'D:\_project\DbAdm', N'data source=.\SqlExpress;initial catalog=Db;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1, 0, N'Bruce', CAST(N'2024-11-01T14:29:48.253' AS DateTime), N'Bruce', CAST(N'2025-02-03T12:32:34.000' AS DateTime))
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'Hr', N'Hr人事', N'HrAdm', N'Hr', 0, N'D:\_project\HrAdm', N'data source=(localdb)\mssqllocaldb;initial catalog=Hr;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1, 0, N'Bruce', CAST(N'2024-11-01T14:29:48.253' AS DateTime), NULL, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'n88VhVu7iY', N'認養補助系統', N'AdoptAdm', N'AdoptTest', 0, N'D:\_project\AdoptAdm', N'data source=192.168.236.178;initial catalog=AdoptTest;User Id=dep106db;Password=YLO3Dr5RQoAl;multipleactiveresultsets=True;TrustServerCertificate=true;', 1, 0, N'Bruce', CAST(N'2025-05-28T10:19:28.000' AS DateTime), NULL, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Code], [DbName], [DbType], [ProjectPath], [ConnectStr], [Status], [FromTmpTable], [Creator], [Created], [Reviser], [Revised]) VALUES (N'vOKkUkVO2D', N'問題追蹤系統', N'Issue', N'Issue', 0, N'd:\_project\Issue', N'data source=.\SQLExpress;initial catalog=Issue;integrated security=True;multipleactiveresultsets=True;TrustServerCertificate=true;', 1, 0, N'Bruce', CAST(N'2025-05-22T14:28:42.000' AS DateTime), N'Bruce', CAST(N'2025-05-22T14:42:32.000' AS DateTime))
GO
INSERT [dbo].[Reporter] ([Id], [Name], [Email]) VALUES (N'QI4F51pZXz', N'測試者', N'eden14700@eden.org.tw')
INSERT [dbo].[Reporter] ([Id], [Name], [Email]) VALUES (N'test2', N'測試者2', N'bruce66tw@gmail.com')
GO
SET IDENTITY_INSERT [dbo].[Survey] ON 

INSERT [dbo].[Survey] ([Sn], [Id], [UserId], [Q1], [Q2], [Q3], [Q4], [Q5], [Created]) VALUES (6, N'rJYWPDoqYz', N'14700', 3, 4, 5, 4, N'test', CAST(N'2025-03-20T11:05:26.440' AS DateTime))
SET IDENTITY_INSERT [dbo].[Survey] OFF
GO
SET IDENTITY_INSERT [dbo].[Table] ON 

INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (79, N'5X9RB36MYA', N'Db', N'Column', N'欄位檔', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (80, N'5X9RB36PRA', N'Db', N'Crud', N'CRUD設定', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (81, N'5X9RB36TCA', N'Db', N'CrudEitem', N'CRUD維護欄位', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (82, N'5X9RB36VLA', N'Db', N'CrudEtable', N'CRUD維護資料表', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (83, N'5X9RB36XEA', N'Db', N'CrudQitem', N'CRUD查詢欄位', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (84, N'5X9RB36ZCA', N'Db', N'CrudRitem', N'CRUD查詢結果欄位', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (85, N'5X9RB3720A', N'Db', N'Project', N'專案檔', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (86, N'5X9RB373ZA', N'Db', N'Table', N'資料表檔', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (87, N'5XD29XBSMA', N'Hr', N'Dept', N'部門', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (88, N'5XD29XC3BA', N'Hr', N'User', N'使用者', N'', 1, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (89, N'5XD29XC6LA', N'Hr', N'UserJob', N'工作經驗', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (90, N'5XD29XC7WA', N'Hr', N'UserLang', N'語言能力', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (91, N'5XD29XC9AA', N'Hr', N'UserLicense', N'用戶證照', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (92, N'5XD29XCAWA', N'Hr', N'UserSchool', N'學歷資料', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (93, N'5XD29XCDPA', N'Hr', N'UserSkill', N'專業技能', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (94, N'5Z5BHXK86A', N'Hr', N'Leave', N'假單', N'', 1, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (95, N'D58J2RM39A', N'Db', N'XpCode', N'雜項檔', N'', 1, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (96, N'D58LXKZJUA', N'Hr', N'Cms', N'CMS', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (97, N'D58LXL00BA', N'Hr', N'CustInput', N'自訂輸入欄位', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (98, N'D58LXL0GHA', N'Hr', N'XpCode', N'雜項檔', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (99, N'D58LXL0Y0A', N'Hr', N'XpEasyRpt', N'簡單報表', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (100, N'D58LXL1D4A', N'Hr', N'XpFlow', N'流程', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (101, N'D58LXL1VTA', N'Hr', N'XpFlowLine', N'流程線', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (102, N'D58LXL2A8A', N'Hr', N'XpFlowNode', N'流程節點', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (103, N'D58LXL2SLA', N'Hr', N'XpFlowSign', N'流程簽核資料', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (104, N'D58LXL378A', N'Hr', N'XpImportLog', N'匯入資料', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (105, N'D58LXL3N4A', N'Hr', N'XpProg', N'系統功能', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (106, N'D58LXL44TA', N'Hr', N'XpRole', N'角色', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (107, N'D58LXL4KKA', N'Hr', N'XpRoleProg', N'角色功能', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (108, N'D58LXL50NA', N'Hr', N'XpTranLog', N'交易記錄', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (109, N'D58LXL5FUA', N'Hr', N'XpUserRole', N'用戶角色', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (110, N'D58WX60WVA', N'D58WWHCYQA', N'Attend', N'手機用戶參加尋寶資料', N'', 0, 0)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (111, N'D58WX61CCA', N'D58WWHCYQA', N'Bao', N'尋寶資料', N'', 1, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (112, N'D58WX61TFA', N'D58WWHCYQA', N'Cms', N'CMS內容', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (113, N'D58WX627KA', N'D58WWHCYQA', N'Reply', N'用戶答題資料', N'', 0, 0)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (114, N'D58WX62PGA', N'D58WWHCYQA', N'Stage', N'尋寶關卡', N'', 1, 0)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (115, N'D58WX634WA', N'D58WWHCYQA', N'User', N'管理系統用戶', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (116, N'D58WX63L5A', N'D58WWHCYQA', N'UserApp', N'手機用戶資料', N'', 1, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (117, N'D58WX6485A', N'D58WWHCYQA', N'UserCust', N'客戶資料', N'', 1, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (118, N'D8ZRXETU8A', N'D58WWHCYQA', N'BaoAttend', N'App用戶參加者資料', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (119, N'D8ZRXEUAEA', N'D58WWHCYQA', N'BaoReply', N'用戶答題資料', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (120, N'D8ZRXEUS7A', N'D58WWHCYQA', N'BaoStage', N'尋寶關卡', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (121, N'D9QTSQF55A', N'D58WWHCYQA', N'XpCode', N'雜項檔', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1470, N'oOG6kwUBcT', N'Db', N'Issue', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1471, N'iskfQCWWld', N'Db', N'MCTDDbDefinition', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1472, N'AHODXbOs21', N'Db', N'MCTMDbDefinition', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1473, N'GP5KoCoFVL', N'Db', N'tmpColumn', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1474, N'6QsXKBAf4h', N'Db', N'tmpTable', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1475, N'bnZnlLytAh', N'Db', N'XpDept', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1476, N'6hxO6mna5B', N'Db', N'XpProg', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1477, N'Shc53pKlhR', N'Db', N'XpRole', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1478, N'RGGtEcyABd', N'Db', N'XpRoleProg', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1479, N'N28UZ1M3aY', N'Db', N'XpUser', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1480, N'e6HaNyL2vi', N'Db', N'XpUserRole', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1481, N'3DgSQnx0Wz', N'Db', N'PrjProg', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1482, N'mOOH7SiWrZ', N'BaxZc0p1G9', N'Cloth', N'衣服基本資料', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1483, N'Pcc3x8gEUv', N'vOKkUkVO2D', N'Issue', N'問題', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1484, N'H3IpNo6Q9a', N'vOKkUkVO2D', N'IssueFile', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1485, N'5m3eGKDETO', N'vOKkUkVO2D', N'IssueLog', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1486, N'ihhoHxJYXM', N'vOKkUkVO2D', N'IssueRelat', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1487, N'9jDLL5XdNI', N'vOKkUkVO2D', N'IssueWatch', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1488, N'R66qCuquX5', N'vOKkUkVO2D', N'Project', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1489, N'ue994CB7lh', N'vOKkUkVO2D', N'XpCode', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1490, N'sHFc93GsbC', N'vOKkUkVO2D', N'XpDept', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1491, N'XP8rQb5IVa', N'vOKkUkVO2D', N'XpProg', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1492, N'D5DeJBgqBy', N'vOKkUkVO2D', N'XpRole', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1493, N'uT3lzL86wk', N'vOKkUkVO2D', N'XpRoleProg', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1494, N'FR1KXdGRMJ', N'vOKkUkVO2D', N'XpUser', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (1495, N'nOP9DDusSI', N'vOKkUkVO2D', N'XpUserRole', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2483, N'ocpdrXTqbK', N'n88VhVu7iY', N'CALENDAR1', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2484, N'LSU6e0qkpX', N'n88VhVu7iY', N'CASE_HISTORY', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2485, N'51BP4254Mp', N'n88VhVu7iY', N'CASE0', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2486, N'pYIb7dhTyD', N'n88VhVu7iY', N'CASE0_EC', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2487, N'HmlSCO5k17', N'n88VhVu7iY', N'CASE0_NOW', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2488, N'QRdZqE5Kvy', N'n88VhVu7iY', N'ccc123', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2489, N'HEMsb8qp7C', N'n88VhVu7iY', N'City', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2490, N'fcYGEaKGPm', N'n88VhVu7iY', N'CLIENT94', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2491, N'RfiydF785T', N'n88VhVu7iY', N'CLT94', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2492, N'i6P1R9ZOn5', N'n88VhVu7iY', N'deltmp', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2493, N'2CbHeFZzR0', N'n88VhVu7iY', N'DUTY1', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2494, N'vxi5p90t18', N'n88VhVu7iY', N'INTERVENTION_APPLY', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2495, N'00Zz2Svt6c', N'n88VhVu7iY', N'INTERVENTION_RESULT', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2496, N'R5bRCEu0SI', N'n88VhVu7iY', N'INTERVENTION_RESULT_BK', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2497, N'DbSCqovOEi', N'n88VhVu7iY', N'INTERVENTION_RESULT1', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2498, N'B6kjooWPf0', N'n88VhVu7iY', N'Item', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2499, N'DujrUrmOth', N'n88VhVu7iY', N'M_DATA', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2500, N'xBpzMFr7AT', N'n88VhVu7iY', N'Maker', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2501, N'C8vqfE0WNE', N'n88VhVu7iY', N'POSITION', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2502, N'etFoyXegqj', N'n88VhVu7iY', N'SQLTOOL', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2503, N'kUPyC6CcDh', N'n88VhVu7iY', N'T_AG', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2504, N'oJ2lVkRNGb', N'n88VhVu7iY', N'T_BA', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2505, N'V6VVf8gXZ4', N'n88VhVu7iY', N'T_CR', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2506, N'CcDQQ6Y0rP', N'n88VhVu7iY', N'T_CS', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2507, N'hxQD6wDs0C', N'n88VhVu7iY', N'T_DP', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2508, N'XDzR7G1e2M', N'n88VhVu7iY', N'T_DS', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2509, N'545O2y4cQk', N'n88VhVu7iY', N'T_EL', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2510, N'PTZQoSrylI', N'n88VhVu7iY', N'T_ES', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2511, N'gHsjhdVVeJ', N'n88VhVu7iY', N'T_GB', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2512, N'IzqZy6HhBd', N'n88VhVu7iY', N'T_GP', N'', N'', 0, 1)
GO
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2513, N'0sNQZQajWm', N'n88VhVu7iY', N'T_HD', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2514, N'OxKwBO6gvd', N'n88VhVu7iY', N'T_HS', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2515, N'rNIxz0zVNk', N'n88VhVu7iY', N'T_JB', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2516, N'piyDNnmdxP', N'n88VhVu7iY', N'T_KG', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2517, N'jxZMC0t3WX', N'n88VhVu7iY', N'T_MA', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2518, N'kSJtwrqTSa', N'n88VhVu7iY', N'T_MF', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2519, N'Udm54LYXyy', N'n88VhVu7iY', N'T_MS', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2520, N'wwaD1pA3nJ', N'n88VhVu7iY', N'T_OS', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2521, N'8hRM8MAu7p', N'n88VhVu7iY', N'T_PA', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2522, N'Wz2O0zQz4Q', N'n88VhVu7iY', N'T_PM', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2523, N'd6yNEAJA6j', N'n88VhVu7iY', N'T_RS', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2524, N'7nMwYO4PuU', N'n88VhVu7iY', N'T_SA', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2525, N'kG2Zz1jy1x', N'n88VhVu7iY', N'T_SB', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2526, N'4Mues4mVpb', N'n88VhVu7iY', N'T_SI', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2527, N'nDyJhwQGye', N'n88VhVu7iY', N'T_SK', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2528, N'dbH5AJOmH4', N'n88VhVu7iY', N'T_SM', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2529, N'wmzv5eLzOG', N'n88VhVu7iY', N'T_ST', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2530, N'OKc9nCj7qx', N'n88VhVu7iY', N'T_SU', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2531, N'EU7FGvndXY', N'n88VhVu7iY', N'T_SW', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2532, N'ASPMXDBoa4', N'n88VhVu7iY', N'T_TC', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2533, N'tUSkGWOqQK', N'n88VhVu7iY', N'tmpColumn', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2534, N'PXtcBLTqq7', N'n88VhVu7iY', N'tmpTable', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2535, N'ltZ6HlmMc4', N'n88VhVu7iY', N'Town', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2536, N'wlB7RWXtef', N'n88VhVu7iY', N'USERS', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2537, N'F23giABfk2', N'n88VhVu7iY', N'XpCode', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2538, N'C8pMJp5dKa', N'n88VhVu7iY', N'XpDept', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2539, N'sGQRl5dVaB', N'n88VhVu7iY', N'XpProg', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2540, N'i5J81wWNzO', N'n88VhVu7iY', N'XpRole', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2541, N'IX7aJo9GLZ', N'n88VhVu7iY', N'XpRoleProg', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2542, N'8HzsNUUuj6', N'n88VhVu7iY', N'XpUser', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2543, N'EYHBxvl56X', N'n88VhVu7iY', N'XpUserRole', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2544, N'udVS9Vysvk', N'n88VhVu7iY', N'出貨', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2545, N'yVIHr8WnpA', N'n88VhVu7iY', N'出貨_明細', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2546, N'Jw7MtURukJ', N'n88VhVu7iY', N'奶水', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2547, N'mWbecH4wVu', N'n88VhVu7iY', N'奶粉', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2548, N'niVUbu8f3J', N'n88VhVu7iY', N'尿布', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2549, N's6o31cuAwQ', N'n88VhVu7iY', N'客戶', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2550, N'6ZsT3fGQ1E', N'n88VhVu7iY', N'客戶服務', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2551, N'E3LU2LSLTU', N'n88VhVu7iY', N'客戶歸屬', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2552, N'xQdSRjpEQi', N'n88VhVu7iY', N'副食品', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2553, N'obVcWBy6KC', N'n88VhVu7iY', N'採購_奶水', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2554, N'rbfZK35isV', N'n88VhVu7iY', N'採購_奶粉', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2555, N'9flTTnMkAG', N'n88VhVu7iY', N'採購_尿布', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2556, N'oJNzrer5cG', N'n88VhVu7iY', N'採購_副食品', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2557, N'F0lDegAn39', N'n88VhVu7iY', N'補助申請', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2558, N'pfvhYVf7QZ', N'n88VhVu7iY', N'資源開拓', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2559, N'vrg671yQ7G', N'n88VhVu7iY', N'資源開拓紀錄', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2560, N'7MaQYQCBvo', N'n88VhVu7iY', N'資源開拓細目', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2561, N'bn5DjtU0UO', N'n88VhVu7iY', N'認養卡', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2562, N'xY5Xa5OA1y', N'n88VhVu7iY', N'認養信', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2563, N'1fUpE8S38b', N'n88VhVu7iY', N'障礙程度', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2564, N'VwrGe8rIqI', N'n88VhVu7iY', N'轉帳記錄', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2565, N'nc19PjV94C', N'n88VhVu7iY', N'轉帳記錄細目', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2566, N'AVQ3WJii71', N'n88VhVu7iY', N'贊助紀錄', N'', N'', 0, 1)
INSERT [dbo].[Table] ([Sn], [Id], [ProjectId], [Code], [Name], [Note], [TranLog], [Status]) VALUES (2567, N'i645mWdUZ3', N'n88VhVu7iY', N'贊助紀錄細目', N'', N'', 0, 1)
SET IDENTITY_INSERT [dbo].[Table] OFF
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'AuthRoles', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'RoleName', N'AuthRoles', N'varchar(45)', 1, N'', 2, N'角色名稱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'CustomerContract', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContractNo', N'CustomerContract', N'varchar(20)', 0, N'', 2, N'合約編號')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProjectNo', N'CustomerContract', N'varchar(20)', 0, N'', 3, N'專案代碼')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProjectName', N'CustomerContract', N'varchar(30)', 1, N'', 4, N'專案名稱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'TaxId', N'CustomerContract', N'char(8)', 0, N'', 5, N'客戶統一編號')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Name', N'CustomerContract', N'varchar(50)', 1, N'', 6, N'客戶名稱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Address', N'CustomerContract', N'varchar(100)', 1, N'', 7, N'公司地址')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Telephone', N'CustomerContract', N'varchar(20)', 1, N'', 8, N'電話')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Email', N'CustomerContract', N'varchar(100)', 1, N'', 9, N'Email')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContractStart', N'CustomerContract', N'datetime', 0, N'', 10, N'合約有效期-起')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContractEnd', N'CustomerContract', N'datetime', 0, N'', 11, N'合約有效期-迄')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactName', N'CustomerContract', N'varchar(50)', 1, N'', 12, N'客戶聯絡窗口')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'FhProductDesc', N'CustomerContract', N'varchar(100)', 1, N'', 13, N'富鴻網產品描述')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'FhContactName', N'CustomerContract', N'varchar(50)', 1, N'', 14, N'富鴻網聯絡窗口')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProductPDM', N'CustomerContract', N'varchar(50)', 1, N'', 15, N'富鴻網產品PDM')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProductPJM', N'CustomerContract', N'varchar(50)', 1, N'', 16, N'富鴻網產品PJM')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AutoRepair', N'CustomerContract', N'tinyint(1)', 1, N'0', 17, N'啟動自動派維修工單')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'CustomerMapping', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'UniNumber', N'CustomerMapping', N'varchar(20)', 0, N'', 2, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CategoryName', N'CustomerMapping', N'varchar(50)', 1, N'', 3, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MixCategoryId', N'CustomerMapping', N'varchar(50)', 1, N'', 4, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'CustomerRepair', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkOrderNo', N'CustomerRepair', N'varchar(20)', 0, N'', 2, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CustomerContractId', N'CustomerRepair', N'varchar(50)', 0, N'', 3, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'RepairDateTime', N'CustomerRepair', N'datetime', 0, N'', 4, N'報修日期、時間')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProblemMain', N'CustomerRepair', N'varchar(50)', 0, N'', 5, N'障礙主類')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProblemSub', N'CustomerRepair', N'varchar(50)', 0, N'', 6, N'障礙次類')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProblemDesc', N'CustomerRepair', N'varchar(100)', 1, N'', 7, N'描述障礙內容')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactrName', N'CustomerRepair', N'varchar(100)', 1, N'', 8, N'描述障礙內容')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactrTel', N'CustomerRepair', N'varchar(100)', 1, N'', 9, N'描述障礙內容')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ContactrEmail', N'CustomerRepair', N'varchar(100)', 1, N'', 10, N'描述障礙內容')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'VideoPath', N'CustomerRepair', N'varchar(200)', 1, N'', 11, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'Department', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Dept', N'Department', N'varchar(50)', 1, N'', 2, N'部門')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Team', N'Department', N'varchar(50)', 1, N'', 3, N'組別')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'OriginSource', N'Department', N'varchar(50)', 1, N'', 4, N'原始來源')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeId', N'Employee', N'varchar(20)', 0, N'', 1, N'帳號')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Name', N'Employee', N'varchar(30)', 1, N'', 2, N'員工姓名')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ENGName', N'Employee', N'varchar(30)', 1, N'', 3, N'員工英文名稱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Phone', N'Employee', N'varchar(20)', 1, N'', 4, N'聯絡電話')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Email', N'Employee', N'varchar(50)', 1, N'', 5, N'電子信箱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'PWD', N'Employee', N'varchar(50)', 1, N'', 6, N'密碼')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Origin', N'Employee', N'varchar(50)', 1, N'', 7, N'來源')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'PhoneToken', N'Employee', N'varchar(100)', 1, N'', 8, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'DepartmentId', N'Employee', N'varchar(50)', 0, N'', 9, N'部門')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeStatus', N'Employee', N'int(11)', 1, N'', 10, N'帳號狀態')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'EmployeeArea', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CityCode', N'EmployeeArea', N'varchar(45)', 1, N'', 2, N'城市代碼')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CityName', N'EmployeeArea', N'varchar(45)', 1, N'', 3, N'城市名稱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AreaCode', N'EmployeeArea', N'varchar(45)', 1, N'', 4, N'郵遞區號')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AreaName', N'EmployeeArea', N'varchar(45)', 1, N'', 5, N'區域名稱(鄉鎮市區)')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'SerialNum', N'EmployeeArea', N'int(11)', 1, N'0', 6, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'EmployeeAuthWork', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeId', N'EmployeeAuthWork', N'varchar(20)', 0, N'', 2, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkCategoryId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 3, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'RegionWorkClass', N'EmployeeAuthWork', N'varchar(10)', 1, N'', 4, N'Region/WorkClass')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeAreaId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 5, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkClassId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 6, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuthRolesId', N'EmployeeAuthWork', N'varchar(50)', 1, N'', 7, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanCreate', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 8, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanRead', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 9, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanDelete', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 10, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CanUpdate', N'EmployeeAuthWork', N'tinyint(1)', 1, N'', 11, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'Errorlog', N'varchar(36)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'DateTime', N'Errorlog', N'datetime', 0, N'', 2, N'發生時間')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'EmployeeId', N'Errorlog', N'varchar(45)', 0, N'', 3, N'登入帳號')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Environment', N'Errorlog', N'varchar(45)', 0, N'', 4, N'環境 (Web、App)')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ExceptionPath', N'Errorlog', N'varchar(100)', 0, N'', 5, N'例外發生位置')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ExceptionMessageJson', N'Errorlog', N'varchar(1000)', 0, N'', 6, N'例外訊息Json')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'MixCategories', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Category', N'MixCategories', N'varchar(30)', 1, N'', 2, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnDescribe', N'MixCategories', N'varchar(50)', 1, N'', 3, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnValue', N'MixCategories', N'varchar(50)', 1, N'', 4, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnType', N'MixCategories', N'varchar(50)', 1, N'', 5, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ParentCategoryId', N'MixCategories', N'varchar(50)', 1, N'', 6, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ColumnSort', N'MixCategories', N'int(11)', 1, N'', 7, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkClass', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ClassName', N'WorkClass', N'varchar(45)', 1, N'', 2, N'類別名稱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ClassPath', N'WorkClass', N'varchar(45)', 1, N'', 3, N'類別路徑')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ParentId', N'WorkClass', N'varchar(50)', 1, N'', 4, N'上層類別 Id')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Sort', N'WorkClass', N'int(11)', 1, N'0', 5, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkOrderImage', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkOrderId', N'WorkOrderImage', N'varchar(50)', 0, N'', 2, N'工單號碼 Id')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ImageSort', N'WorkOrderImage', N'int(11)', 0, N'', 3, N'影像排序')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ImageType', N'WorkOrderImage', N'varchar(50)', 1, N'', 4, N'影像分類')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ImagePath', N'WorkOrderImage', N'varchar(100)', 0, N'', 5, N'影像名稱')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkOrderNo', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Product', N'WorkOrderNo', N'varchar(1)', 0, N'', 2, N'工單字軌')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkNo', N'WorkOrderNo', N'int(11)', 0, N'', 3, N'工單單日流水號')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MaxNo', N'WorkOrderNo', N'int(11)', 0, N'', 4, N'單日流水號最大值')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MinNo', N'WorkOrderNo', N'int(11)', 0, N'', 5, N'單日流水號最小值')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Date', N'WorkOrderNo', N'datetime', 0, N'', 6, N'工單號碼分配日期')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkProcedure', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkOrderId', N'WorkProcedure', N'varchar(50)', 0, N'', 2, N'工單號碼 Id')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorDate', N'WorkProcedure', N'datetime', 1, N'', 3, N'審核時間')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorDescription', N'WorkProcedure', N'varchar(100)', 1, N'', 4, N'審核結果說明')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorEmployeeId', N'WorkProcedure', N'varchar(20)', 1, N'', 5, N'審核人員 Id ')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CheckPoint', N'WorkProcedure', N'varchar(50)', 1, N'', 6, N'審核節點')
GO
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditorStatus', N'WorkProcedure', N'tinyint(1)', 1, N'', 7, N'審核結果')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'Id', N'WorkResponse', N'varchar(50)', 0, N'', 1, N'')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'CustomerRepairId', N'WorkResponse', N'varchar(50)', 0, N'', 2, N'報修工單 Id')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkDatetime', N'WorkResponse', N'datetime', 1, N'', 3, N'派工日期時間')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'ProcessDatetime', N'WorkResponse', N'datetime', 1, N'', 4, N'處理日期時間')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'MaintainProcessDesc', N'WorkResponse', N'varchar(100)', 1, N'', 5, N'維運處理描述')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkEmpId', N'WorkResponse', N'varchar(20)', 1, N'', 6, N'施工人員 Id')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'AuditEmpId', N'WorkResponse', N'varchar(20)', 1, N'', 7, N'審核人員 Id')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'PmEmpId', N'WorkResponse', N'varchar(20)', 1, N'', 8, N'主管單位 Id')
INSERT [dbo].[tmpColumn] ([Code], [TableCode], [DataType], [Nullable], [DefaultValue], [Sort], [Note]) VALUES (N'WorkStatusMappingId', N'WorkResponse', N'varchar(50)', 1, N'', 9, N'工單進程 Id')
GO
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'AuthRoles', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'CustomerContract', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'CustomerMapping', N'客戶對應設定')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'CustomerRepair', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'Department', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'Employee', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'EmployeeArea', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'EmployeeAuthWork', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'Errorlog', N'異常錯誤Log')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'MixCategories', N'各類別主檔')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkClass', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkOrderImage', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkOrderNo', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkProcedure', N'')
INSERT [dbo].[tmpTable] ([Code], [Note]) VALUES (N'WorkResponse', N'')
GO
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'0', N'無', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'1', N'個人', 2, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'2', N'部門', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthRange', N'9', N'全部', 4, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'0', N'無', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'1', N'Controller', 2, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'2', N'Action', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'0', N'None', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Email', N'Email', 2, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Max', N'Max', 5, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Min', N'Min', 4, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Range', N'Range', 6, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Url', N'Url', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'C', N'CheckBox', 7, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'D', N'Date', 9, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'DEC', N'Decimal', 5, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'DT', N'DateTime', 10, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'F', N'File', 11, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'H', N'Hide', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'HTML', N'Html', 12, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'INT', N'Integer', 4, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'MO', N'Modal', 14, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'PWD', N'Password', 15, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'R', N'Radio', 8, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'RO', N'ReadOnly', 16, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'S', N'Select', 6, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'SO', N'Sort', 13, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'T', N'Text', 2, N'Q', NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'EitemType', N'TA', N'TextArea', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'C', N'CheckBox', 6, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'D', N'Date', 8, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'DT', N'DateTime', 9, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'F', N'File', 10, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'H', N'Hide', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'MO', N'Modal', 12, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'N', N'Numeric', 4, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'PWD', N'Password', 13, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'R', N'Radio', 7, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'RO', N'Read Only', 14, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'S', N'Select', 5, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'SO', N'Sort', 11, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'T', N'Text', 2, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'TA', N'TextArea', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'K', N'知識', 2, NULL, N'KM')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'L', N'請假', 4, NULL, N'Leave')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'M', N'會議', 3, NULL, N'Meeting')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'O', N'其他', 5, NULL, N'Other')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'IssueType', N'R', N'例行工作', 1, NULL, N'Routine')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Equal', N'Equal', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'In', N'In', 4, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'InRange', N'In Range', 12, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Is', N'Is', 9, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'IsNull', N'Is Null', 10, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like', N'Like', 2, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like2', N'Like(模糊)', 5, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like2Cols', N'Like Cols(模糊)', 8, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'LikeCols', N'Like Cols', 7, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'LikeList', N'Like List', 6, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'NotLike', N'Not Like', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'NotNull', N'Not Null', 11, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'UD', N'User Defined', 13, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'0', N'Normal', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'CF', N'Crud Fun', 2, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'SN', N'Status Name', 4, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'SS', N'Set Status', 6, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'UD', N'User Defined', 7, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'YE', N'YesEmpty', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'SurveySatis', N'Q1', N'1.本次服務是否解決了您的問題？', 1, NULL, N'滿意度問卷, Q1-Q5為Survey欄位名稱')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'SurveySatis', N'Q2', N'2.本次的回應速度是否符合您的期望？', 2, NULL, N'數字欄位')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'SurveySatis', N'Q3', N'3.對本次服務的專業度和服務態度是否滿意？', 3, NULL, N'數字欄位')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'SurveySatis', N'Q4', N'4.對本次服務的整體滿意度如何？', 4, NULL, N'數字欄位')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'SurveySatis', N'Q5', N'5.對本部門的服務有何改進建議？', 5, NULL, N'文字欄位')
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'Address', N'地址', 3, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'Base', N'基本', 1, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'Cart', N'購物車', 8, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'In', N'進貨', 4, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'Man', N'人員', 2, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'Order', N'訂單', 7, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'Out', N'出貨', 5, NULL, NULL)
INSERT [dbo].[XpCode] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'TableType', N'Stock', N'庫存', 6, NULL, NULL)
GO
INSERT [dbo].[XpDept] ([Id], [Name], [MgrId]) VALUES (N'RD', N'研發部', N'Nick')
INSERT [dbo].[XpDept] ([Id], [Name], [MgrId]) VALUES (N'ST', N'軟體中心', N'Bruce')
GO
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Column', N'Column', N'Column', NULL, N'/Column/Read', 3, 1, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'DataDict', N'DataDict', N'DataDict', NULL, N'/DataDict/Read', 5, 0, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'DataDictIm', N'DataDictImport', N'DataDictImport', NULL, N'/DataDictImport/Read', 6, 0, 1, 1, 0, 0, 0, 0, 0, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Issue', N'Issue', N'Issue', NULL, N'/Issue/Read', 8, 1, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'MyCrud', N'MyCrud', N'MyCrud', NULL, N'/MyCrud/Read', 4, 1, 0, 1, 1, 0, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'PrjProg', N'PrjProg', N'PrjProg', NULL, N'/PrjProg/Read', 7, 0, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Project', N'Project', N'Project', NULL, N'/Project/Read', 1, 1, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'SetPwd', N'SetPwd', N'SetPwd', NULL, N'/SetPwd/Index', 7, 0, 0, 0, 0, 0, 0, 0, 0, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Survey', N'Survey', N'Survey', NULL, N'/Survey/Read', 9, 0, 0, 1, 0, 0, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Table', N'Table', N'Table', NULL, N'/Table/Read', 2, 1, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpProg', N'XpProg', N'XpProg', NULL, N'/XpProg/Read', 7, 0, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpRole', N'XpRole', N'XpRole', NULL, N'/XpRole/Read', 6, 0, 1, 1, 1, 1, 0, 0, 1, 0)
INSERT [dbo].[XpProg] ([Id], [Code], [Name], [Icon], [Url], [Sort], [AuthRow], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'XpUser', N'XpUser', N'XpUser', NULL, N'/XpUser/Read', 7, 0, 1, 1, 1, 1, 0, 0, 1, 0)
GO
INSERT [dbo].[XpRole] ([Id], [Name]) VALUES (N'Adm', N'管理者')
INSERT [dbo].[XpRole] ([Id], [Name]) VALUES (N'All', N'開發者')
INSERT [dbo].[XpRole] ([Id], [Name]) VALUES (N'DeptMgr', N'部門主管')
GO
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'2koAJkBw89', N'Adm', N'XpProg', 1, 0, 0, 0, 0, 0, 0, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'3lZiDGr9R5', N'All', N'Column', 1, 9, 1, 0, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'5uUEMXOUVx', N'Adm', N'DataDictIm', 1, 9, 0, 0, 0, 0, 0, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'6IuPtprTF2', N'Adm', N'PrjProg', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'bgZ6GpMNDn', N'Adm', N'Table', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'g8AyNRQlp4', N'Adm', N'DataDict', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Kixl0dENNu', N'Adm', N'Survey', 0, 9, 0, 0, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'lckATVuDUg', N'Adm', N'Issue', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'LftpdhJIUf', N'All', N'MyCrud', 1, 9, 2, 0, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'nkyeSv59PR', N'All', N'Table', 1, 9, 1, 0, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'np60Iog2rt', N'All', N'Issue', 1, 9, 1, 1, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'q4jiuKviUm', N'All', N'SetPwd', 0, 0, 0, 0, 0, 0, 0, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'RZbOdEKfUt', N'Adm', N'XpUser', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N's7YQjszjpn', N'All', N'Survey', 0, 9, 0, 0, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'Sb3k71zgds', N'All', N'Project', 1, 9, 1, 0, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'ThvaGXxpZN', N'Adm', N'Column', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'twEbJKKcOi', N'Adm', N'MyCrud', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'z0fW8NzHUn', N'Adm', N'XpRole', 1, 0, 0, 0, 0, 0, 0, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'zmta9T2gax', N'All', N'PrjProg', 1, 9, 9, 9, 0, 0, 9, 0)
INSERT [dbo].[XpRoleProg] ([Id], [RoleId], [ProgId], [FunCreate], [FunRead], [FunUpdate], [FunDelete], [FunPrint], [FunExport], [FunView], [FunOther]) VALUES (N'zNA1tEuwsA', N'Adm', N'Project', 1, 9, 9, 9, 0, 0, 9, 0)
GO
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Bruce', N'bruce', N'aa', N'QSS8CpM1wn8IbyS6IHpJEg', N'ST', NULL, 1)
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Dyrel', N'銘豪', N'bb', N'Ia0L2Da5DQj0z2QLTCmOfA', N'ST', NULL, 1)
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Ivan', N'進發', N'ivan', N'QSS8CpM1wn8IbyS6IHpJEg', N'ST', NULL, 1)
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'LOTxPI5WM8', N'AD 測試', N'14700', N'', N'ST', NULL, 1)
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Paddy', N'paddy', N'paddy', N'', N'ST', NULL, 1)
INSERT [dbo].[XpUser] ([Id], [Name], [Account], [Pwd], [DeptId], [PhotoFile], [Status]) VALUES (N'Peter', N'peter', N'peter', N'Udww3cRz1DpgEenrumyncA', N'ST', NULL, 1)
GO
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'001', N'Bruce', N'Adm')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'2XmQ5Hr6Pq', N'Bruce', N'DeptMgr')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'aDlW0BPg7w', N'Paddy', N'DeptMgr')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'bmjmgIjdnZ', N'Paddy', N'All')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'GRxr11hlYV', N'Bruce', N'All')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'GtV5lJY9mi', N'Peter', N'DeptMgr')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'h46y8LIE9G', N'Paddy', N'Adm')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'HXytfka6G5', N'Ivan', N'All')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'KEyS227lwQ', N'Peter', N'Adm')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'mI4YJ9yWgD', N'LOTxPI5WM8', N'All')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'o92I4LnG0Q', N'Ivan', N'DeptMgr')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'PrWpJZCg2t', N'Dyrel', N'DeptMgr')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'Vdn6EA6hQM', N'Dyrel', N'All')
INSERT [dbo].[XpUserRole] ([Id], [UserId], [RoleId]) VALUES (N'x5LC12AHXQ', N'Peter', N'All')
GO
ALTER TABLE [dbo].[Issue] ADD  CONSTRAINT [DF_Issue_SurveyTimes]  DEFAULT ((0)) FOR [SendTimes]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_DbType]  DEFAULT ((0)) FOR [DbType]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_FromTmpTable]  DEFAULT ((0)) FOR [FromTmpTable]
GO
ALTER TABLE [dbo].[Survey] ADD  CONSTRAINT [DF_Survey_Q1]  DEFAULT ((0)) FOR [Q1]
GO
ALTER TABLE [dbo].[Survey] ADD  CONSTRAINT [DF_Survey_Q2]  DEFAULT ((0)) FOR [Q2]
GO
ALTER TABLE [dbo].[Survey] ADD  CONSTRAINT [DF_Survey_Q3]  DEFAULT ((0)) FOR [Q3]
GO
ALTER TABLE [dbo].[Survey] ADD  CONSTRAINT [DF_Survey_Q4]  DEFAULT ((0)) FOR [Q4]
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'refer XpCode.Type=''TableType''' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DataDict', @level2type=N'COLUMN',@level2name=N'TableType'
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'同Issue.Id' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Survey', @level2type=N'COLUMN',@level2name=N'Id'
GO
