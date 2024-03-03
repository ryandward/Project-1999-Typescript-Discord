--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.1

-- Started on 2024-03-03 21:45:18 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 258 (class 1255 OID 17061)
-- Name: create_notify_trigger(text); Type: FUNCTION; Schema: public; Owner: ryandward
--

CREATE FUNCTION public.create_notify_trigger(table_name text) RETURNS void
    LANGUAGE plpgsql
    AS $_$
DECLARE
  trigger_name text := table_name || '_update_trigger';
  function_name text := 'notify_' || table_name || '_update';
  channel_name text := table_name || '_update';
BEGIN
  EXECUTE format('
    CREATE OR REPLACE FUNCTION %I()
    RETURNS TRIGGER AS $func$
    BEGIN
      PERFORM pg_notify(%L, ''updated'');
      RETURN NEW;
    END;
    $func$ LANGUAGE plpgsql;
    
    DROP TRIGGER IF EXISTS %I ON %I;
    
    CREATE TRIGGER %I
    AFTER INSERT OR UPDATE OR DELETE ON %I
    FOR EACH ROW EXECUTE FUNCTION %I();
  ', function_name, channel_name, trigger_name, table_name, trigger_name, table_name, function_name);
END;
$_$;


ALTER FUNCTION public.create_notify_trigger(table_name text) OWNER TO ryandward;

--
-- TOC entry 259 (class 1255 OID 17062)
-- Name: notify_census_update(); Type: FUNCTION; Schema: public; Owner: ryandward
--

CREATE FUNCTION public.notify_census_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      PERFORM pg_notify('census_update', 'updated');
      RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.notify_census_update() OWNER TO ryandward;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 17818)
-- Name: census; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.census (
    discord_id text NOT NULL,
    name text NOT NULL,
    character_class text,
    level bigint NOT NULL,
    status text NOT NULL,
    "time" text DEFAULT CURRENT_TIMESTAMP,
    id bigint NOT NULL
);


ALTER TABLE public.census OWNER TO ryandward;

--
-- TOC entry 246 (class 1259 OID 17909)
-- Name: active_toons; Type: VIEW; Schema: public; Owner: ryandward
--

CREATE VIEW public.active_toons AS
 SELECT discord_id,
    name,
    character_class,
    level,
    status,
    "time",
    id
   FROM public.census
  WHERE (status <> 'Dropped'::text);


ALTER VIEW public.active_toons OWNER TO ryandward;

--
-- TOC entry 256 (class 1259 OID 17944)
-- Name: active_toons_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.active_toons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.active_toons_id_seq OWNER TO ryandward;

--
-- TOC entry 247 (class 1259 OID 17913)
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.attendance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attendance_id_seq OWNER TO ryandward;

--
-- TOC entry 237 (class 1259 OID 17824)
-- Name: attendance; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.attendance (
    raid text,
    name text,
    date timestamp without time zone,
    discord_id text,
    id bigint DEFAULT nextval('public.attendance_id_seq'::regclass) NOT NULL,
    modifier bigint
);


ALTER TABLE public.attendance OWNER TO ryandward;

--
-- TOC entry 251 (class 1259 OID 17930)
-- Name: bank_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.bank_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bank_id_seq OWNER TO ryandward;

--
-- TOC entry 234 (class 1259 OID 17812)
-- Name: bank; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.bank (
    banker text,
    location text,
    name text,
    eq_item_id text,
    quantity bigint,
    slots bigint,
    "time" timestamp without time zone,
    id bigint DEFAULT nextval('public.bank_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.bank OWNER TO ryandward;

--
-- TOC entry 235 (class 1259 OID 17817)
-- Name: census_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.census_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.census_id_seq OWNER TO ryandward;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 235
-- Name: census_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ryandward
--

ALTER SEQUENCE public.census_id_seq OWNED BY public.census.id;


--
-- TOC entry 253 (class 1259 OID 17936)
-- Name: class_definitions_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.class_definitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.class_definitions_id_seq OWNER TO ryandward;

--
-- TOC entry 239 (class 1259 OID 17834)
-- Name: class_definitions; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.class_definitions (
    class_name text,
    character_class text,
    id bigint DEFAULT nextval('public.class_definitions_id_seq'::regclass) NOT NULL,
    level_attained bigint
);


ALTER TABLE public.class_definitions OWNER TO ryandward;

--
-- TOC entry 252 (class 1259 OID 17934)
-- Name: class_lore_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.class_lore_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.class_lore_id_seq OWNER TO ryandward;

--
-- TOC entry 238 (class 1259 OID 17829)
-- Name: class_lore; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.class_lore (
    character_class text,
    description text,
    id bigint DEFAULT nextval('public.class_lore_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.class_lore OWNER TO ryandward;

--
-- TOC entry 245 (class 1259 OID 17857)
-- Name: class_roles; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.class_roles (
    character_class text,
    role_id bigint,
    id bigint NOT NULL
);


ALTER TABLE public.class_roles OWNER TO ryandward;

--
-- TOC entry 244 (class 1259 OID 17856)
-- Name: class_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.class_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.class_roles_id_seq OWNER TO ryandward;

--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 244
-- Name: class_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ryandward
--

ALTER SEQUENCE public.class_roles_id_seq OWNED BY public.class_roles.id;


--
-- TOC entry 242 (class 1259 OID 17845)
-- Name: dkp; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.dkp (
    id bigint NOT NULL,
    discord_name text,
    earned_dkp bigint,
    spent_dkp bigint,
    discord_id text,
    date_joined timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.dkp OWNER TO ryandward;

--
-- TOC entry 241 (class 1259 OID 17844)
-- Name: dkp_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.dkp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dkp_id_seq OWNER TO ryandward;

--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 241
-- Name: dkp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ryandward
--

ALTER SEQUENCE public.dkp_id_seq OWNED BY public.dkp.id;


--
-- TOC entry 254 (class 1259 OID 17938)
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventory_id_seq OWNER TO ryandward;

--
-- TOC entry 240 (class 1259 OID 17839)
-- Name: inventory; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.inventory (
    toon text,
    location text,
    name text,
    eq_item_id text,
    quantity bigint,
    slots bigint,
    "time" timestamp without time zone,
    id bigint DEFAULT nextval('public.inventory_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.inventory OWNER TO ryandward;

--
-- TOC entry 255 (class 1259 OID 17941)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_id_seq OWNER TO ryandward;

--
-- TOC entry 243 (class 1259 OID 17851)
-- Name: items; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.items (
    name text,
    date timestamp without time zone,
    item text,
    dkp_spent bigint,
    discord_id text,
    id bigint DEFAULT nextval('public.items_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.items OWNER TO ryandward;

--
-- TOC entry 248 (class 1259 OID 17924)
-- Name: races_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.races_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.races_id_seq OWNER TO ryandward;

--
-- TOC entry 231 (class 1259 OID 17797)
-- Name: races; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.races (
    race text,
    id bigint DEFAULT nextval('public.races_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.races OWNER TO ryandward;

--
-- TOC entry 250 (class 1259 OID 17928)
-- Name: raids_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.raids_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.raids_id_seq OWNER TO ryandward;

--
-- TOC entry 233 (class 1259 OID 17807)
-- Name: raids; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.raids (
    raid text NOT NULL,
    type text,
    modifier bigint,
    id bigint DEFAULT nextval('public.raids_id_seq'::regclass)
);


ALTER TABLE public.raids OWNER TO ryandward;

--
-- TOC entry 257 (class 1259 OID 25944)
-- Name: status; Type: VIEW; Schema: public; Owner: ryandward
--

CREATE VIEW public.status AS
 SELECT DISTINCT status
   FROM public.census;


ALTER VIEW public.status OWNER TO ryandward;

--
-- TOC entry 249 (class 1259 OID 17926)
-- Name: trash_id_seq; Type: SEQUENCE; Schema: public; Owner: ryandward
--

CREATE SEQUENCE public.trash_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trash_id_seq OWNER TO ryandward;

--
-- TOC entry 232 (class 1259 OID 17802)
-- Name: trash; Type: TABLE; Schema: public; Owner: ryandward
--

CREATE TABLE public.trash (
    name text,
    id bigint DEFAULT nextval('public.trash_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.trash OWNER TO ryandward;

--
-- TOC entry 3299 (class 2604 OID 17945)
-- Name: active_toons id; Type: DEFAULT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.active_toons ALTER COLUMN id SET DEFAULT nextval('public.active_toons_id_seq'::regclass);


--
-- TOC entry 3290 (class 2604 OID 17932)
-- Name: census id; Type: DEFAULT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.census ALTER COLUMN id SET DEFAULT nextval('public.census_id_seq'::regclass);


--
-- TOC entry 3298 (class 2604 OID 17943)
-- Name: class_roles id; Type: DEFAULT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.class_roles ALTER COLUMN id SET DEFAULT nextval('public.class_roles_id_seq'::regclass);


--
-- TOC entry 3295 (class 2604 OID 17940)
-- Name: dkp id; Type: DEFAULT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.dkp ALTER COLUMN id SET DEFAULT nextval('public.dkp_id_seq'::regclass);


--
-- TOC entry 3301 (class 2606 OID 17883)
-- Name: races idx_17797_races_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.races
    ADD CONSTRAINT idx_17797_races_pkey PRIMARY KEY (id);


--
-- TOC entry 3303 (class 2606 OID 17885)
-- Name: trash idx_17802_trash_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.trash
    ADD CONSTRAINT idx_17802_trash_pkey PRIMARY KEY (id);


--
-- TOC entry 3305 (class 2606 OID 17884)
-- Name: raids idx_17807_sqlite_autoindex_raids_1; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.raids
    ADD CONSTRAINT idx_17807_sqlite_autoindex_raids_1 PRIMARY KEY (raid);


--
-- TOC entry 3307 (class 2606 OID 17887)
-- Name: bank idx_17812_bank_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.bank
    ADD CONSTRAINT idx_17812_bank_pkey PRIMARY KEY (id);


--
-- TOC entry 3309 (class 2606 OID 17888)
-- Name: census idx_17818_census_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.census
    ADD CONSTRAINT idx_17818_census_pkey PRIMARY KEY (id);


--
-- TOC entry 3312 (class 2606 OID 17891)
-- Name: attendance idx_17824_attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT idx_17824_attendance_pkey PRIMARY KEY (id);


--
-- TOC entry 3314 (class 2606 OID 17886)
-- Name: class_lore idx_17829_class_lore_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.class_lore
    ADD CONSTRAINT idx_17829_class_lore_pkey PRIMARY KEY (id);


--
-- TOC entry 3316 (class 2606 OID 17889)
-- Name: class_definitions idx_17834_class_definitions_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.class_definitions
    ADD CONSTRAINT idx_17834_class_definitions_pkey PRIMARY KEY (id);


--
-- TOC entry 3318 (class 2606 OID 17890)
-- Name: inventory idx_17839_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT idx_17839_inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 3320 (class 2606 OID 17894)
-- Name: dkp idx_17845_dkp_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.dkp
    ADD CONSTRAINT idx_17845_dkp_pkey PRIMARY KEY (id);


--
-- TOC entry 3322 (class 2606 OID 17893)
-- Name: items idx_17851_items_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT idx_17851_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3324 (class 2606 OID 17892)
-- Name: class_roles idx_17857_class_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: ryandward
--

ALTER TABLE ONLY public.class_roles
    ADD CONSTRAINT idx_17857_class_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3310 (class 1259 OID 17869)
-- Name: idx_17818_sqlite_autoindex_census_1; Type: INDEX; Schema: public; Owner: ryandward
--

CREATE UNIQUE INDEX idx_17818_sqlite_autoindex_census_1 ON public.census USING btree (name);


-- Completed on 2024-03-03 21:45:18 UTC

--
-- PostgreSQL database dump complete
--

