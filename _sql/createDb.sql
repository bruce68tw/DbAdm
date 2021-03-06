/****** Object:  Database [Db]    Script Date: 2021/3/5 下午 03:54:10 ******/
/*
USE [master]
GO

CREATE DATABASE [Db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Db', FILENAME = N'C:\Users\575X\Db.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Db_log', FILENAME = N'C:\Users\575X\Db_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Db] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Db] SET ARITHABORT OFF 
GO
ALTER DATABASE [Db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Db] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Db] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Db] SET  MULTI_USER 
GO
ALTER DATABASE [Db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Db] SET QUERY_STORE = OFF
GO
USE [Db]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
*/
USE [Db]
GO
/****** Object:  Table [dbo].[Code]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Code](
	[Type] [varchar](20) NOT NULL,
	[Value] [varchar](10) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Sort] [int] NOT NULL,
	[Ext] [varchar](30) NULL,
	[Note] [nvarchar](255) NULL,
 CONSTRAINT [PK_Code] PRIMARY KEY CLUSTERED 
(
	[Type] ASC,
	[Value] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Column]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Column](
	[Id] [varchar](10) NOT NULL,
	[TableId] [varchar](10) NOT NULL,
	[Code] [varchar](30) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[DataType] [varchar](20) NOT NULL,
	[Nullable] [bit] NOT NULL,
	[DefaultValue] [varchar](20) NULL,
	[Sort] [int] NOT NULL,
	[Note] [nvarchar](255) NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Column] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Crud]    Script Date: 2021/3/5 下午 03:54:10 ******/
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
 CONSTRAINT [PK_Crud] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudEitem]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudEitem](
	[Id] [varchar](10) NOT NULL,
	[EtableId] [varchar](10) NOT NULL,
	[ColumnId] [varchar](10) NOT NULL,
	[InputType] [varchar](10) NOT NULL,
	[InputData] [nvarchar](50) NULL,
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
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudEtable]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudEtable](
	[Id] [varchar](10) NOT NULL,
	[CrudId] [varchar](10) NOT NULL,
	[TableId] [varchar](10) NOT NULL,
	[Kid] [varchar](10) NOT NULL,
	[MapFid] [varchar](10) NULL,
	[Col4] [varchar](30) NOT NULL,
	[OrderBy] [varchar](10) NOT NULL,
	[Sort] [int] NOT NULL,
	[HalfWidth] [bit] NOT NULL,
 CONSTRAINT [PK_CrudEtable] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudQitem]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudQitem](
	[Id] [varchar](10) NOT NULL,
	[CrudId] [varchar](10) NOT NULL,
	[ColumnId] [varchar](10) NOT NULL,
	[TableAs] [varchar](20) NOT NULL,
	[InputType] [varchar](20) NOT NULL,
	[InputData] [varchar](20) NULL,
	[Op] [varchar](10) NOT NULL,
	[IsRange] [bit] NOT NULL,
	[IsFind2] [bit] NOT NULL,
	[PosGroup] [varchar](10) NULL,
	[LayoutCols] [varchar](20) NULL,
	[ExtInfo] [varchar](20) NULL,
	[Sort] [int] NOT NULL,
 CONSTRAINT [PK_CrudQitem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CrudRitem]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CrudRitem](
	[Id] [varchar](10) NOT NULL,
	[CrudId] [varchar](10) NOT NULL,
	[ColumnCode] [varchar](30) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Width] [int] NOT NULL,
	[RitemType] [varchar](10) NOT NULL,
	[ExtInfo] [varchar](30) NULL,
	[Sort] [int] NOT NULL,
 CONSTRAINT [PK_CrudRitem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Id] [varchar](10) NOT NULL,
	[Code] [nvarchar](30) NOT NULL,
	[DbName] [varchar](20) NOT NULL,
	[ProjectPath] [varchar](255) NOT NULL,
	[ConnectStr] [varchar](255) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Table]    Script Date: 2021/3/5 下午 03:54:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table](
	[Id] [varchar](10) NOT NULL,
	[ProjectId] [varchar](10) NOT NULL,
	[Code] [varchar](30) NOT NULL,
	[Name] [nvarchar](30) NOT NULL,
	[Note] [nvarchar](255) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_Table] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'0', N'無', 1, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'1', N'Controller', 2, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'AuthType', N'2', N'Action', 3, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'0', N'None', 1, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Email', N'Email', 2, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Max', N'Max', 5, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Min', N'Min', 4, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Range', N'Range', 6, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'CheckType', N'Url', N'Url', 3, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'C', N'CheckBox', 6, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'D', N'Date', 8, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'DT', N'DateTime', 9, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'F', N'File', 10, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'H', N'Hide', 1, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'MO', N'Modal', 12, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'N', N'Numeric', 4, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'PWD', N'Password', 13, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'R', N'Radio', 7, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'RO', N'Read Only', 14, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'S', N'Select', 5, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'SO', N'Sort', 11, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'T', N'Text', 2, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'InputType', N'TA', N'TextArea', 3, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Equal', N'Equal', 1, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'In', N'In', 4, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'InRange', N'In Range', 12, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Is', N'Is', 9, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'IsNull', N'Is Null', 10, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like', N'Like', 2, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like2', N'Like(模糊)', 5, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'Like2Cols', N'Like Cols(模糊)', 8, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'LikeCols', N'Like Cols', 7, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'LikeList', N'Like List', 6, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'NotLike', N'Not Like', 3, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'NotNull', N'Not Null', 11, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'QitemOp', N'UD', N'User Defined', 13, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'0', N'Normal', 1, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'CF', N'Crud Fun', 2, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'DT', N'DateTime', 5, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'SN', N'Status Name', 4, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'SS', N'Set Status', 3, NULL, NULL)
INSERT [dbo].[Code] ([Type], [Value], [Name], [Sort], [Ext], [Note]) VALUES (N'RitemType', N'UD', N'User Defined', 5, NULL, NULL)
GO
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB37KZA', N'5X9RB36EJA', N'Type', N'類型', N'varchar(10)', 0, N'', 1, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB37QJA', N'5X9RB36EJA', N'Code', N'代碼', N'varchar(10)', 0, N'', 2, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB37SNA', N'5X9RB36EJA', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB37UHA', N'5X9RB36EJA', N'Sort', N'排序', N'int', 0, N'', 4, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB37WCA', N'5X9RB36EJA', N'Ext', N'其他資料', N'varchar(30)', 1, N'', 5, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB37ZKA', N'5X9RB36MYA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB381FA', N'5X9RB36MYA', N'TableId', N'資料表Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3845A', N'5X9RB36MYA', N'Name', N'欄位名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3890A', N'5X9RB36MYA', N'DataType', N'資料型態', N'varchar(20)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB38APA', N'5X9RB36MYA', N'Nullable', N'可空值', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB38E9A', N'5X9RB36MYA', N'DefaultValue', N'預設值', N'varchar(20)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB38G3A', N'5X9RB36MYA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB38HTA', N'5X9RB36MYA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB38KTA', N'5X9RB36MYA', N'Status', N'資料狀態', N'bit', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB38NHA', N'5X9RB36PRA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB38QJA', N'5X9RB36PRA', N'ProjectId', N'專案Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB395WA', N'5X9RB36PRA', N'LabelHori', N'水平Label', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB397PA', N'5X9RB36PRA', N'ReadSql', N'查詢Sql', N'varchar(500)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39DFA', N'5X9RB36PRA', N'TableAs', N'資料表別名', N'varchar(10)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39FLA', N'5X9RB36PRA', N'HasCreate', N'Create功能', N'bit', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39HDA', N'5X9RB36PRA', N'HasUpdate', N'Update功能', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39L2A', N'5X9RB36PRA', N'HasDelete', N'Delete功能', N'bit', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39NSA', N'5X9RB36PRA', N'HasView', N'View功能', N'bit', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39QUA', N'5X9RB36PRA', N'HasExport', N'Export功能', N'bit', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39TLA', N'5X9RB36PRA', N'HasReset', N'Reset功能', N'bit', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39VJA', N'5X9RB36PRA', N'Status', N'資料狀態', N'bit', 0, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB39XPA', N'5X9RB36TCA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3A19A', N'5X9RB36TCA', N'EtableId', N'EtableId', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3A4CA', N'5X9RB36TCA', N'InputType', N'輸入類型', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3A6GA', N'5X9RB36TCA', N'InputData', N'輸入資料', N'nvarchar(50)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3A9JA', N'5X9RB36TCA', N'Required', N'必填', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3ABDA', N'5X9RB36TCA', N'HasCreate', N'Create功能', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3ACRA', N'5X9RB36TCA', N'HasUpdate', N'Update功能', N'bit', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3AE4A', N'5X9RB36TCA', N'PlaceHolder', N'PlaceHolder', N'varchar(10)', 1, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3AHCA', N'5X9RB36TCA', N'DefaultValue', N'預設值', N'varchar(10)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3AT3A', N'5X9RB36TCA', N'PosGroup', N'同列', N'varchar(10)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3BH2A', N'5X9RB36TCA', N'LayoutCols', N'版位', N'varchar(10)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3DMHA', N'5X9RB36TCA', N'Width', N'欄位寬度', N'int', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3E38A', N'5X9RB36TCA', N'CheckType', N'檢查類型', N'varchar(10)', 0, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3E4QA', N'5X9RB36TCA', N'CheckData', N'檢查資料', N'varchar(10)', 1, N'', 15, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3E6SA', N'5X9RB36TCA', N'Sort', N'排序', N'int', 0, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3E8JA', N'5X9RB36VLA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3EAAA', N'5X9RB36VLA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3EBUA', N'5X9RB36VLA', N'TableId', N'資料表Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3EDAA', N'5X9RB36VLA', N'Kid', N'主鍵Id', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3EEPA', N'5X9RB36VLA', N'MapFid', N'外鍵Id', N'varchar(10)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3EG4A', N'5X9RB36VLA', N'Col4', N'Col4', N'varchar(30)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3EHJA', N'5X9RB36VLA', N'OrderBy', N'OrderBy', N'varchar(10)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3EK8A', N'5X9RB36VLA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3ELQA', N'5X9RB36XEA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3ENRA', N'5X9RB36XEA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3F0AA', N'5X9RB36XEA', N'TableAs', N'資料表別名', N'varchar(20)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FABA', N'5X9RB36XEA', N'InputType', N'輸入類型', N'varchar(20)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FC9A', N'5X9RB36XEA', N'InputData', N'輸入資料', N'varchar(20)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FELA', N'5X9RB36XEA', N'Op', N'比對方式', N'varchar(10)', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FG9A', N'5X9RB36XEA', N'IsRange', N'Range比對', N'bit', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FHUA', N'5X9RB36XEA', N'IsFind2', N'進階查詢', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FKDA', N'5X9RB36XEA', N'PosGroup', N'同列', N'varchar(10)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FM3A', N'5X9RB36XEA', N'LayoutCols', N'版位', N'varchar(20)', 1, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FNUA', N'5X9RB36XEA', N'ExtInfo', N'其他資料', N'varchar(20)', 1, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FQ1A', N'5X9RB36XEA', N'Sort', N'排序', N'int', 0, N'', 13, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FRUA', N'5X9RB36ZCA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3FTJA', N'5X9RB36ZCA', N'CrudId', N'CrudId', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3G21A', N'5X9RB36ZCA', N'Width', N'欄位寬度', N'int', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3G3PA', N'5X9RB36ZCA', N'RitemType', N'結果欄位類型', N'varchar(10)', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3G5KA', N'5X9RB36ZCA', N'ExtInfo', N'其他資料', N'varchar(30)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3G71A', N'5X9RB36ZCA', N'Sort', N'排序', N'int', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3G8EA', N'5X9RB3720A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GG2A', N'5X9RB3720A', N'DbName', N'Db名稱', N'varchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GK9A', N'5X9RB3720A', N'ProjectPath', N'專案路徑', N'varchar(255)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GLJA', N'5X9RB3720A', N'ConnectStr', N'Db連線字串', N'varchar(255)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GN2A', N'5X9RB3720A', N'Status', N'資料狀態', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GPHA', N'5X9RB373ZA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GRZA', N'5X9RB373ZA', N'ProjectId', N'專案Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GT3A', N'5X9RB373ZA', N'Name', N'資料表名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GWNA', N'5X9RB373ZA', N'Note', N'說明', N'nvarchar(255)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5X9RB3GZ3A', N'5X9RB373ZA', N'Status', N'資料狀態', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XBA43L8QA', N'5X9RB36TCA', N'ColumnId', N'欄位Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XBA43LBNA', N'5X9RB36XEA', N'ColumnId', N'欄位Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XCRAA', N'5XD29XBSMA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XCUNA', N'5XD29XBSMA', N'Name', N'部門名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XCW1A', N'5XD29XBSMA', N'MgrId', N'主管Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XCXFA', N'5XD29XBZHA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XCYRA', N'5XD29XBZHA', N'Name', N'功能名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XD08A', N'5XD29XBZHA', N'Cname', N'功能中文名', N'nvarchar(30)', 0, N'', 3, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XD23A', N'5XD29XC1AA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XD41A', N'5XD29XC1AA', N'Name', N'角色名稱', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XD5LA', N'5XD29XC3BA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XD72A', N'5XD29XC3BA', N'Account', N'帳號', N'varchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XD8JA', N'5XD29XC3BA', N'Name', N'使用者名稱', N'nvarchar(20)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDARA', N'5XD29XC3BA', N'DeptId', N'部門', N'varchar(10)', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDBYA', N'5XD29XC3BA', N'Status', N'資料狀態', N'bit', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDDDA', N'5XD29XC6LA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDF1A', N'5XD29XC6LA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDGTA', N'5XD29XC6LA', N'JobName', N'工作名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDKZA', N'5XD29XC6LA', N'JobType', N'工作類型', N'nvarchar(30)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDN0A', N'5XD29XC6LA', N'JobPlace', N'工作地點', N'nvarchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDPVA', N'5XD29XC6LA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDUAA', N'5XD29XC6LA', N'CorpName', N'公司名稱', N'nvarchar(30)', 1, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDVWA', N'5XD29XC6LA', N'CorpUsers', N'公司人數', N'int', 0, N'0', 8, N'', 1)
GO
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XDXPA', N'5XD29XC6LA', N'IsManaged', N'管理職', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XE1AA', N'5XD29XC6LA', N'JobDesc', N'工作說明', N'varchar(-1)', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XE2UA', N'5XD29XC7WA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XE9LA', N'5XD29XC7WA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XFPMA', N'5XD29XC7WA', N'LangName', N'語言名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XFX1A', N'5XD29XC7WA', N'ListenLevel', N'聴力', N'tinyint', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XFZXA', N'5XD29XC7WA', N'SpeakLevel', N'說', N'tinyint', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XG6HA', N'5XD29XC7WA', N'ReadLevel', N'閱讀', N'tinyint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XG8HA', N'5XD29XC7WA', N'WriteLevel', N'書寫', N'tinyint', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGACA', N'5XD29XC7WA', N'Sort', N'資料排序', N'int', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGC3A', N'5XD29XC9AA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGE9A', N'5XD29XC9AA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGG3A', N'5XD29XC9AA', N'LicenseName', N'證照名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGHSA', N'5XD29XC9AA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGKPA', N'5XD29XC9AA', N'FileName', N'上傳檔名', N'nvarchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGNVA', N'5XD29XCAWA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGR4A', N'5XD29XCAWA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGSRA', N'5XD29XCAWA', N'SchoolName', N'學校名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGV8A', N'5XD29XCAWA', N'SchoolDept', N'科系', N'nvarchar(20)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGWUA', N'5XD29XCAWA', N'SchoolType', N'學歷種類', N'nvarchar(20)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XGZGA', N'5XD29XCAWA', N'StartEnd', N'起迄時間', N'varchar(30)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XH1CA', N'5XD29XCAWA', N'Graduated', N'是否畢業', N'bit', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XH4HA', N'5XD29XCDPA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'PKey', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XH6EA', N'5XD29XCDPA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XH8EA', N'5XD29XCDPA', N'SkillName', N'技能名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XD29XHA2A', N'5XD29XCDPA', N'SkillDesc', N'技能說明', N'nvarchar(500)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XLQ99LK5A', N'5XLQ99L3XA', N'Type', N'類別', N'varchar(10)', 0, N'', 1, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XLQ99LMZA', N'5XLQ99L3XA', N'Code', N'資料代碼', N'varchar(10)', 0, N'', 2, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XLQ99LPMA', N'5XLQ99L3XA', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 3, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XLQ99LQXA', N'5XLQ99L3XA', N'Sort', N'排序', N'int', 0, N'', 4, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XLQ99LSCA', N'5XLQ99L3XA', N'Ext', N'額外資料', N'varchar(30)', 1, N'', 5, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XLQ99LTVA', N'5XD29XC9AA', N'Sort', N'', N'int', 0, N'', 6, N'', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5XLQ99LV9A', N'5XD29XCDPA', N'Sort', N'排序', N'int', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZE6A', N'5XD29XBZHA', N'Code', N'功能代碼', N'varchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZHLA', N'5XD29XBZHA', N'Icon', N'圖示', N'varchar(20)', 1, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZKGA', N'5XD29XBZHA', N'Url', N'Url', N'varchar(100)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZMAA', N'5YFVGEXX7A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZP5A', N'5YFVGEXX7A', N'RoleId', N'角色Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZR5A', N'5YFVGEXX7A', N'ProgId', N'功能Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZSJA', N'5XD29XC3BA', N'Pwd', N'密碼', N'varchar(32)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZTZA', N'5YFVGEXZEA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZV9A', N'5YFVGEXZEA', N'UserId', N'用戶Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVGEZWHA', N'5YFVGEXZEA', N'RoleId', N'角色Id', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXBYXA', N'5X9RB36MYA', N'Code', N'欄位代碼', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXC0WA', N'5X9RB36PRA', N'ProgCode', N'功能代碼', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXC2BA', N'5X9RB36PRA', N'ProgName', N'功能名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXC3RA', N'5X9RB36PRA', N'AuthType', N'權限種類', N'tinyint', 0, N'', 14, N'see Code, 0(無), 1(Ctrl), 2(Action)', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXC4ZA', N'5X9RB36PRA', N'Created', N'建檔時間', N'datetime', 0, N'', 16, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXC6KA', N'5X9RB36PRA', N'Revised', N'修改時間', N'datetime', 1, N'', 17, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXC7TA', N'5X9RB36ZCA', N'ColumnCode', N'欄位代碼', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXC9YA', N'5X9RB36ZCA', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXCB7A', N'5X9RB3720A', N'Code', N'專案代碼', N'nvarchar(30)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5YFVJXCCVA', N'5X9RB373ZA', N'Code', N'資料表代碼', N'varchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXKMMA', N'5Z5BHXK04A', N'Type', N'類別', N'varchar(20)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXKSSA', N'5Z5BHXK04A', N'Code', N'資料代碼', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXKVDA', N'5Z5BHXK04A', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXKXRA', N'5Z5BHXK04A', N'Sort', N'排序', N'int', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXKZAA', N'5Z5BHXK04A', N'Ext', N'額外資料', N'varchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXL1EA', N'5Z5BHXK04A', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXL2PA', N'5Z5BHXK2KA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXL4DA', N'5Z5BHXK2KA', N'Code', N'代碼', N'varchar(20)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXL5KA', N'5Z5BHXK2KA', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXL75A', N'5Z5BHXK2KA', N'Portrait', N'是否直立', N'bit', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXL8HA', N'5Z5BHXK2KA', N'Status', N'資料狀態', N'bit', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXL9ZA', N'5Z5BHXK3SA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLB3A', N'5Z5BHXK3SA', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLCUA', N'5Z5BHXK3SA', N'StartNode', N'開始節點', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLE3A', N'5Z5BHXK3SA', N'EndNode', N'結束節點', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLG4A', N'5Z5BHXK3SA', N'CondStr', N'條件字串', N'varchar(255)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLHCA', N'5Z5BHXK3SA', N'Sort', N'排序', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLJZA', N'5Z5BHXK5CA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLLBA', N'5Z5BHXK5CA', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLMRA', N'5Z5BHXK5CA', N'Name', N'名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLP5A', N'5Z5BHXK5CA', N'NodeType', N'節點類別', N'char(1)', 0, N'', 4, N'Code NodeType', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLQAA', N'5Z5BHXK5CA', N'PosX', N'位置X', N'smallint', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLS0A', N'5Z5BHXK5CA', N'PosY', N'位置Y', N'smallint', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLT4A', N'5Z5BHXK5CA', N'SignerType', N'簽核者類別', N'varchar(2)', 1, N'', 7, N'Code SignerType', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLUJA', N'5Z5BHXK5CA', N'SignerValue', N'簽核者值', N'varchar(30)', 1, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLXPA', N'5Z5BHXK5CA', N'PassType', N'通過類別', N'char(1)', 0, N'', 9, N'Code PassType', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXLZ3A', N'5Z5BHXK5CA', N'PassNum', N'通過數量', N'smallint', 1, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXM0CA', N'5Z5BHXK6HA', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXM1KA', N'5Z5BHXK6HA', N'FlowId', N'流程Id', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXM34A', N'5Z5BHXK6HA', N'NodeName', N'節點名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXM4GA', N'5Z5BHXK6HA', N'SignerId', N'簽核者Id', N'varchar(10)', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXM6JA', N'5Z5BHXK6HA', N'SignStatus', N'簽核狀態', N'char(1)', 0, N'', 5, N'Code SignStatus', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXM80A', N'5Z5BHXK6HA', N'Note', N'備註', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXM96A', N'5Z5BHXK6HA', N'Sort', N'排序', N'smallint', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMAQA', N'5Z5BHXK6HA', N'Created', N'建立時間', N'datetime', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMCMA', N'5Z5BHXK86A', N'Id', N'Id', N'varchar(10)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXME5A', N'5Z5BHXK86A', N'UserId', N'請假人', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMFJA', N'5Z5BHXK86A', N'AgentId', N'代理人', N'varchar(10)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMGLA', N'5Z5BHXK86A', N'LeaveType', N'假別', N'tinyint', 0, N'', 4, N'Code LeaveType', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMJ7A', N'5Z5BHXK86A', N'StartTime', N'開始時間', N'datetime', 0, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMKSA', N'5Z5BHXK86A', N'EndTime', N'結束時間', N'datetime', 0, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMM5A', N'5Z5BHXK86A', N'Hours', N'請假時數', N'decimal', 0, N'', 7, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMS5A', N'5Z5BHXK86A', N'FlowSignStatus', N'流程簽核狀態', N'char(1)', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMU0A', N'5Z5BHXK86A', N'Status', N'資料狀態', N'bit', 0, N'', 10, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMVTA', N'5Z5BHXK86A', N'Creator', N'建檔人員', N'varchar(10)', 0, N'', 11, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMXVA', N'5Z5BHXK86A', N'Created', N'建檔日期', N'datetime', 0, N'', 12, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXMZRA', N'5Z5BHXK86A', N'Reviser', N'修改人員', N'varchar(10)', 1, N'', 13, N'', 1)
GO
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z5BHXN1KA', N'5Z5BHXK86A', N'Revised', N'修改日期', N'datetime', 1, N'', 14, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5Z7AVBDAHA', N'5Z5BHXK86A', N'FlowNodeLevel', N'流程目前level', N'tinyint', 0, N'', 8, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5ZKB7A6G9A', N'5ZKB7A5QAA', N'Type', N'資料類別', N'varchar(20)', 0, N'', 1, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5ZKB7A6N1A', N'5ZKB7A5QAA', N'Name', N'顯示名稱', N'nvarchar(30)', 0, N'', 3, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5ZKB7A6Q3A', N'5ZKB7A5QAA', N'Sort', N'排序', N'int', 0, N'', 4, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5ZKB7A6RWA', N'5ZKB7A5QAA', N'Ext', N'擴充資料', N'varchar(30)', 1, N'', 5, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5ZKB7A6TQA', N'5ZKB7A5QAA', N'Note', N'說明', N'nvarchar(255)', 1, N'', 6, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5ZKB7A6VPA', N'5X9RB36VLA', N'HalfWidth', N'是否半幅寬度', N'bit', 0, N'', 9, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'5ZKBHGNN1A', N'5ZKB7A5QAA', N'Value', N'資料內容', N'varchar(10)', 0, N'', 2, N'', 1)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'C01', N'T01', N'C01', N'C01 name', N'varchar(10)', 0, N'11', 1, N'2233', 0)
INSERT [dbo].[Column] ([Id], [TableId], [Code], [Name], [DataType], [Nullable], [DefaultValue], [Sort], [Note], [Status]) VALUES (N'C02', N'T02', N'C02', N'C02 name', N'varchar(10)', 0, NULL, 2, NULL, 1)
GO
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5XDCQU13AA', N'Hr', N'UserExt', N'用戶學經歷維護', 1, N'select u.*, d.name as DeptName from [User] u
join [Dept] d on u.DeptId=d.Id
order by u.Id', N'', 0, 1, 0, 1, 0, 1, 1, 1, CAST(N'2020-12-12T19:18:07.000' AS DateTime), CAST(N'2021-01-20T18:09:39.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5YFB6C2XKA', N'Hr', N'User', N'用戶維護', 1, N'select u.Id, u.Account, u.Name, u.Status,
   d.Name as DeptName
from [User] u
join Dept d on u.DeptId=d.Id
order by u.Name', N'', 1, 1, 1, 1, 0, 1, 1, 1, CAST(N'2021-01-21T23:35:17.000' AS DateTime), CAST(N'2021-01-22T15:54:51.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5YG4KXSFVA', N'Hr', N'Role', N'角色維護', 1, N'select * from Role
order by Id', N'', 1, 1, 1, 1, 0, 1, 1, 1, CAST(N'2021-01-22T21:12:03.000' AS DateTime), CAST(N'2021-01-22T22:56:15.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5YG70CB56A', N'Hr', N'Prog', N'功能維護', 1, N'select * from Prog
order by Id', N'', 1, 1, 1, 1, 0, 0, 1, 1, CAST(N'2021-01-22T23:06:48.000' AS DateTime), CAST(N'2021-01-22T23:18:26.000' AS DateTime))
INSERT [dbo].[Crud] ([Id], [ProjectId], [ProgCode], [ProgName], [LabelHori], [ReadSql], [TableAs], [HasCreate], [HasUpdate], [HasDelete], [HasView], [HasExport], [HasReset], [AuthType], [Status], [Created], [Revised]) VALUES (N'5Z5JPZR5HA', N'Hr', N'Leave', N'請假作業', 1, N'select l.* 
from Leave l
join [User] u on l.UserId=u.Id
join [User] u2 on l.AgentId=u2.Id
order by l.Id', N'', 1, 1, 1, 1, 0, 1, 1, 1, CAST(N'2021-02-18T01:11:15.000' AS DateTime), CAST(N'2021-02-20T11:53:27.000' AS DateTime))
GO
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYLM3KAA', N'5XEYLM3AWA', N'5XD29XD5LA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYLM3N0A', N'5XEYLM3AWA', N'5XD29XD72A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLFSBA', N'5XEYLM3AWA', N'5XD29XD8JA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLFW4A', N'5XEYLM3AWA', N'5XD29XDARA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLFXLA', N'5XEYLM3AWA', N'5XD29XDBYA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLFYVA', N'5XEYNLFBNA', N'5XD29XDDDA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLG0EA', N'5XEYNLFBNA', N'5XD29XDF1A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLG1MA', N'5XEYNLFBNA', N'5XD29XDGTA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLG31A', N'5XEYNLFBNA', N'5XD29XDKZA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLG4KA', N'5XEYNLFBNA', N'5XD29XDN0A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLG5VA', N'5XEYNLFBNA', N'5XD29XDPVA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLG7CA', N'5XEYNLFBNA', N'5XD29XDUAA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLG8MA', N'5XEYNLFBNA', N'5XD29XDVWA', N'N', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLGA4A', N'5XEYNLFBNA', N'5XD29XDXPA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYNLGBGA', N'5XEYNLFBNA', N'5XD29XE1AA', N'MO', N'1000', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNH5A', N'5XEYURMVMA', N'5XD29XGNVA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNJEA', N'5XEYURMVMA', N'5XD29XGR4A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNKSA', N'5XEYURMVMA', N'5XD29XGSRA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNN1A', N'5XEYURMVMA', N'5XD29XGV8A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNQBA', N'5XEYURMVMA', N'5XD29XGWUA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNRRA', N'5XEYURMVMA', N'5XD29XGZGA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNSWA', N'5XEYURMVMA', N'5XD29XH1CA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNX4A', N'5XEYURN5GA', N'5XD29XE2UA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURNZNA', N'5XEYURN5GA', N'5XD29XE9LA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURP18A', N'5XEYURN5GA', N'5XD29XGACA', N'SO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURP33A', N'5XEYURN5GA', N'5XD29XFPMA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURP56A', N'5XEYURN5GA', N'5XD29XFX1A', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURP6HA', N'5XEYURN5GA', N'5XD29XFZXA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURP80A', N'5XEYURN5GA', N'5XD29XG6HA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURP9NA', N'5XEYURN5GA', N'5XD29XG8HA', N'S', N'LangLevels', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPBDA', N'5XEYURNAJA', N'5XD29XGC3A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPDTA', N'5XEYURNAJA', N'5XD29XGE9A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPFAA', N'5XEYURNAJA', N'5XD29XGG3A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPGVA', N'5XEYURNAJA', N'5XD29XGHSA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPN5A', N'5XEYURNAJA', N'5XD29XGKPA', N'F', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPPJA', N'5XEYURNC2A', N'5XD29XH4HA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPQVA', N'5XEYURNC2A', N'5XD29XH6EA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPT8A', N'5XEYURNC2A', N'5XD29XHC2A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPWGA', N'5XEYURNC2A', N'5XD29XH8EA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XEYURPYZA', N'5XEYURNC2A', N'5XD29XHA2A', N'TA', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5XLQA0CC6A', N'5XEYURNC2A', N'5XLQ99LV9A', N'SO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFCNZLN9A', N'5YFCNZL8NA', N'5XD29XD5LA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFCNZLRHA', N'5YFCNZL8NA', N'5XD29XD72A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFCNZLTXA', N'5YFCNZL8NA', N'5XD29XD8JA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFCNZLV5A', N'5YFCNZL8NA', N'5XD29XDARA', N'S', N'Depts', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFCNZLXLA', N'5YFCNZL8NA', N'5XD29XDBYA', N'C', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFVMEQ3QA', N'5YFVMEPW5A', N'5YFVGEZTZA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFVMEQ6VA', N'5YFVMEPW5A', N'5YFVGEZV9A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFVMEQ81A', N'5YFVMEPW5A', N'5YFVGEZWHA', N'S', N'Roles', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YFY3BQSWA', N'5YFCNZL8NA', N'5YFVGEZSJA', N'PWD', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG4KXTXJA', N'5YG4KXTSVA', N'5XD29XD23A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG4KXU1DA', N'5YG4KXTSVA', N'5XD29XD41A', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG4KXU2PA', N'5YG4KXTV9A', N'5YFVGEZMAA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG4KXU58A', N'5YG4KXTV9A', N'5YFVGEZP5A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG4KXU6EA', N'5YG4KXTV9A', N'5YFVGEZR5A', N'S', N'Progs', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CC5SA', N'5YG70CC0CA', N'5XD29XCXFA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CC8LA', N'5YG70CC0CA', N'5YFVGEZE6A', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CCJRA', N'5YG70CC0CA', N'5XD29XCYRA', N'T', N'', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CCM9A', N'5YG70CC0CA', N'5YFVGEZHLA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CCNMA', N'5YG70CC0CA', N'5YFVGEZKGA', N'T', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CCQMA', N'5YG70CC2GA', N'5YFVGEZMAA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CCS2A', N'5YG70CC2GA', N'5YFVGEZP5A', N'S', N'Roles', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5YG70CCTNA', N'5YG70CC2GA', N'5YFVGEZR5A', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9Q8A', N'5Z642A9LLA', N'5Z5BHXMCMA', N'H', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 0)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9QYA', N'5Z642A9LLA', N'5Z5BHXME5A', N'S', N'Users', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 1)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9RUA', N'5Z642A9LLA', N'5Z5BHXMFJA', N'S', N'Users', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 2)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9T0A', N'5Z642A9LLA', N'5Z5BHXMGLA', N'S', N'LeaveTypes', 1, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 3)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9TYA', N'5Z642A9LLA', N'5Z5BHXMJ7A', N'DT', N'', 1, 1, 1, N'', N'', N'', N'2,4', 0, N'0', N'', 4)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9ULA', N'5Z642A9LLA', N'5Z5BHXMKSA', N'DT', N'', 1, 1, 1, N'', N'', N'', N'2,4', 0, N'0', N'', 5)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9VKA', N'5Z642A9LLA', N'5Z5BHXMM5A', N'N', N'', 1, 1, 1, N'', N'', N'', N'2,1', 0, N'0', N'', 6)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9XHA', N'5Z642A9LLA', N'5Z5BHXMS5A', N'RO', N'FlowSignStatusName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 7)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9YGA', N'5Z642A9LLA', N'5Z5BHXMU0A', N'C', N'啟用', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 8)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642A9ZHA', N'5Z642A9LLA', N'5Z5BHXMVTA', N'RO', N'CreatorName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 9)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642AA1FA', N'5Z642A9LLA', N'5Z5BHXMXVA', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 10)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642AA2HA', N'5Z642A9LLA', N'5Z5BHXMZRA', N'RO', N'ReviserName', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 11)
INSERT [dbo].[CrudEitem] ([Id], [EtableId], [ColumnId], [InputType], [InputData], [Required], [HasCreate], [HasUpdate], [PlaceHolder], [DefaultValue], [PosGroup], [LayoutCols], [Width], [CheckType], [CheckData], [Sort]) VALUES (N'5Z642AA37A', N'5Z642A9LLA', N'5Z5BHXN1KA', N'RO', N'', 0, 1, 1, N'', N'', N'', N'', 0, N'0', N'', 12)
GO
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5XEYLM3AWA', N'5XDCQU13AA', N'5XD29XC3BA', N'Id', N'', N'0', N'', 0, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5XEYNLFBNA', N'5XDCQU13AA', N'5XD29XC6LA', N'Id', N'UserId', N'0', N'', 2, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5XEYURMVMA', N'5XDCQU13AA', N'5XD29XCAWA', N'Id', N'UserId', N'0', N'', 1, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5XEYURN5GA', N'5XDCQU13AA', N'5XD29XC7WA', N'Id', N'UserId', N'0', N'Sort', 3, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5XEYURNAJA', N'5XDCQU13AA', N'5XD29XC9AA', N'Id', N'UserId', N'0', N'', 4, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5XEYURNC2A', N'5XDCQU13AA', N'5XD29XCDPA', N'Id', N'UserId', N'0', N'', 5, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5YFCNZL8NA', N'5YFB6C2XKA', N'5XD29XC3BA', N'Id', N'', N'0', N'', 0, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5YFVMEPW5A', N'5YFB6C2XKA', N'5YFVGEXZEA', N'Id', N'UserId', N'0', N'', 1, 1)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5YG4KXTSVA', N'5YG4KXSFVA', N'5XD29XC1AA', N'Id', N'', N'0', N'', 0, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5YG4KXTV9A', N'5YG4KXSFVA', N'5YFVGEXX7A', N'Id', N'RoleId', N'0', N'', 1, 1)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5YG70CC0CA', N'5YG70CB56A', N'5XD29XBZHA', N'Id', N'', N'0', N'', 0, 0)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5YG70CC2GA', N'5YG70CB56A', N'5YFVGEXX7A', N'Id', N'ProgId', N'0', N'', 1, 1)
INSERT [dbo].[CrudEtable] ([Id], [CrudId], [TableId], [Kid], [MapFid], [Col4], [OrderBy], [Sort], [HalfWidth]) VALUES (N'5Z642A9LLA', N'5Z5JPZR5HA', N'5Z5BHXK86A', N'Id', N'', N'1', N'', 0, 0)
GO
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5XDCQUBPRA', N'5XDCQU13AA', N'5XD29XD72A', N'', N'T', N'', N'Like', 0, 0, N'', N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5XDCS43M4A', N'5XDCQU13AA', N'5XD29XD8JA', N'', N'T', N'', N'Like', 0, 0, N'', N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5XDCS43PJA', N'5XDCQU13AA', N'5XD29XDARA', N'', N'S', N'Depts', N'Equal', 0, 0, N'', N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5YFCH2K2NA', N'5YFB6C2XKA', N'5XD29XD72A', N'', N'T', N'', N'Like', 0, 0, N'', N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5YFCH2KDYA', N'5YFB6C2XKA', N'5XD29XD8JA', N'', N'T', N'', N'Like', 0, 0, N'', N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5YFCH2KK3A', N'5YFB6C2XKA', N'5XD29XDARA', N'', N'S', N'Depts', N'Equal', 0, 0, N'', N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5YG4KXTH4A', N'5YG4KXSFVA', N'5XD29XD41A', N'', N'T', N'', N'Like', 0, 0, N'', N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5YG70CBFBA', N'5YG70CB56A', N'5YFVGEZE6A', N'', N'T', N'', N'Like', 0, 0, N'', N'', N'', 0)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5YG70CBL4A', N'5YG70CB56A', N'5XD29XCYRA', N'', N'T', N'', N'Like', 0, 0, N'', N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACK6A', N'5Z5JPZR5HA', N'5Z5BHXMGLA', N'', N'S', N'LeaveTypes', N'Equal', 0, 0, N'', N'', N'', 1)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACL6A', N'5Z5JPZR5HA', N'5Z5BHXMS5A', N'', N'S', N'SignStatuses', N'Equal', 0, 0, N'', N'', N'', 2)
INSERT [dbo].[CrudQitem] ([Id], [CrudId], [ColumnId], [TableAs], [InputType], [InputData], [Op], [IsRange], [IsFind2], [PosGroup], [LayoutCols], [ExtInfo], [Sort]) VALUES (N'5Z87DRL40A', N'5Z5JPZR5HA', N'5Z5BHXMJ7A', N'', N'D', N'', N'InRange', 1, 0, N'', N'', N'', 0)
GO
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5XEXK6A9SA', N'5XDCQU13AA', N'Account', N'帳號', 0, N'0', N'', 0)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5XEXK6ASFA', N'5XDCQU13AA', N'Name', N'使用者名稱', 0, N'0', N'', 1)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5XEXK6B26A', N'5XDCQU13AA', N'DeptName', N'部門', 0, N'0', N'', 2)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5XEXK6B5MA', N'5XDCQU13AA', N'Status', N'資料狀態', 0, N'SS', N'', 3)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5XEXK6B9RA', N'5XDCQU13AA', N'_Fun', N'維護', 0, N'CF', N'', 4)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YFCJVDVKA', N'5YFB6C2XKA', N'Account', N'帳號', 0, N'0', N'', 0)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YFCJVEBEA', N'5YFB6C2XKA', N'Name', N'使用者名稱', 0, N'0', N'', 1)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YFCJVEF0A', N'5YFB6C2XKA', N'DeptName', N'部門', 0, N'0', N'', 2)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YFCJVEJLA', N'5YFB6C2XKA', N'Status', N'資料狀態', 0, N'SS', N'', 3)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YFXR6UWHA', N'5YFB6C2XKA', N'_Fun', N'維護', 0, N'CF', N'', 4)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YG4KXTQJA', N'5YG4KXSFVA', N'Name', N'角色名稱', 0, N'0', N'', 0)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YG6SSVYPA', N'5YG4KXSFVA', N'_Fun', N'維護', 0, N'CF', N'', 1)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YG70CBMMA', N'5YG70CB56A', N'Code', N'功能代碼', 0, N'0', N'', 0)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YG70CBQNA', N'5YG70CB56A', N'Name', N'功能名稱', 0, N'0', N'', 1)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YG70CBS2A', N'5YG70CB56A', N'Icon', N'圖示', 0, N'0', N'', 2)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YG70CBUGA', N'5YG70CB56A', N'Url', N'Url', 0, N'0', N'', 3)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5YG70CBXLA', N'5YG70CB56A', N'_Fun', N'維護', 0, N'CF', N'', 4)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACLWA', N'5Z5JPZR5HA', N'UserId', N'請假人', 0, N'0', N'', 0)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACMUA', N'5Z5JPZR5HA', N'AgentId', N'代理人', 0, N'0', N'', 1)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACP0A', N'5Z5JPZR5HA', N'LeaveType', N'假別', 0, N'0', N'', 2)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACPQA', N'5Z5JPZR5HA', N'StartTime', N'開始時間', 0, N'DT', N'', 3)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACQUA', N'5Z5JPZR5HA', N'EndTime', N'結束時間', 0, N'DT', N'', 4)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACRPA', N'5Z5JPZR5HA', N'Hours', N'請假時數', 0, N'0', N'', 5)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACTKA', N'5Z5JPZR5HA', N'FlowSignStatus', N'流程簽核狀態', 0, N'0', N'', 6)
INSERT [dbo].[CrudRitem] ([Id], [CrudId], [ColumnCode], [Name], [Width], [RitemType], [ExtInfo], [Sort]) VALUES (N'5Z5ZUACUHA', N'5Z5JPZR5HA', N'Created', N'Created', 0, N'DT', N'', 7)
GO
INSERT [dbo].[Project] ([Id], [Code], [DbName], [ProjectPath], [ConnectStr], [Status]) VALUES (N'Db', N'DbAdm', N'Db', N'(empty)', N'data source=(localdb)\mssqllocaldb;initial catalog=Db;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1)
INSERT [dbo].[Project] ([Id], [Code], [DbName], [ProjectPath], [ConnectStr], [Status]) VALUES (N'Hr', N'HrAdm', N'Hr', N'D:\_project2\HrAdm', N'data source=(localdb)\mssqllocaldb;initial catalog=Hr;integrated security=True;multipleactiveresultsets=True;max pool size=1000;', 1)
GO
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB36MYA', N'Db', N'Column', N'欄位檔', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB36PRA', N'Db', N'Crud', N'CRUD設定', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB36TCA', N'Db', N'CrudEitem', N'CRUD維護欄位', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB36VLA', N'Db', N'CrudEtable', N'CRUD維護資料表', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB36XEA', N'Db', N'CrudQitem', N'CRUD查詢欄位', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB36ZCA', N'Db', N'CrudRitem', N'CRUD查詢結果欄位', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB3720A', N'Db', N'Project', N'專案檔', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5X9RB373ZA', N'Db', N'Table', N'資料表檔', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XBSMA', N'Hr', N'Dept', N'部門', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XBZHA', N'Hr', N'Prog', N'系統功能', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XC1AA', N'Hr', N'Role', N'角色', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XC3BA', N'Hr', N'User', N'使用者', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XC6LA', N'Hr', N'UserJob', N'工作經驗', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XC7WA', N'Hr', N'UserLang', N'語言能力', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XC9AA', N'Hr', N'UserLicense', N'用戶證照', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XCAWA', N'Hr', N'UserSchool', N'學歷資料', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5XD29XCDPA', N'Hr', N'UserSkill', N'專業技能', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5YFVGEXX7A', N'Hr', N'RoleProg', N'角色功能', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5YFVGEXZEA', N'Hr', N'UserRole', N'用戶角色', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5Z5BHXK04A', N'Hr', N'Code', N'雜項檔', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5Z5BHXK2KA', N'Hr', N'Flow', N'流程', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5Z5BHXK3SA', N'Hr', N'FlowLine', N'流程線', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5Z5BHXK5CA', N'Hr', N'FlowNode', N'流程節點', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5Z5BHXK6HA', N'Hr', N'FlowSign', N'流程簽核資料', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5Z5BHXK86A', N'Hr', N'Leave', N'假單', N'', 1)
INSERT [dbo].[Table] ([Id], [ProjectId], [Code], [Name], [Note], [Status]) VALUES (N'5ZKB7A5QAA', N'Db', N'Code', N'雜項檔', N'', 1)
GO
ALTER TABLE [dbo].[CrudEitem]  WITH CHECK ADD  CONSTRAINT [FK_CrudEitem_CrudEtable] FOREIGN KEY([EtableId])
REFERENCES [dbo].[CrudEtable] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CrudEitem] CHECK CONSTRAINT [FK_CrudEitem_CrudEtable]
GO
ALTER TABLE [dbo].[CrudEtable]  WITH CHECK ADD  CONSTRAINT [FK_CrudEtable_Crud] FOREIGN KEY([CrudId])
REFERENCES [dbo].[Crud] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CrudEtable] CHECK CONSTRAINT [FK_CrudEtable_Crud]
GO
ALTER TABLE [dbo].[CrudQitem]  WITH CHECK ADD  CONSTRAINT [FK_CrudQitem_Crud] FOREIGN KEY([CrudId])
REFERENCES [dbo].[Crud] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CrudQitem] CHECK CONSTRAINT [FK_CrudQitem_Crud]
GO
ALTER TABLE [dbo].[CrudRitem]  WITH CHECK ADD  CONSTRAINT [FK_CrudRitem_Crud] FOREIGN KEY([CrudId])
REFERENCES [dbo].[Crud] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CrudRitem] CHECK CONSTRAINT [FK_CrudRitem_Crud]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'權限種類, 0(無), 1(Ctrl), 2(Action)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Crud', @level2type=N'COLUMN',@level2name=N'AuthType'
GO
/*
USE [master]
GO
ALTER DATABASE [Db] SET  READ_WRITE 
GO
*/