--
-- PostgreSQL database dump
--

-- Dumped from database version 11.11
-- Dumped by pg_dump version 13.3

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

SET default_tablespace = '';

--
-- Name: user; Type: TABLE; Schema: public; Owner: totipu
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "eMail" character varying NOT NULL,
    password character varying NOT NULL,
    age integer
);


-- ALTER TABLE public."user" OWNER TO totipu;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: totipu
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.user_id_seq OWNER TO totipu;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: totipu
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: totipu
--

COPY public."user" (id, "firstName", "lastName", "eMail", password, age) FROM stdin;
1	Mark	Povich	mark.povich@heiferinternational.com	pass123pass	34
2	Anny	Brightling	anny.brightling@brightpink.com	pass123pass	25
3	John	Russinovich	john.russinovich@vscancer.com	pass123pass	56
4	Cindy	Fundmaister	cindy.fundmaister@wattsoflove.com	pass123pass	97
5	Mason	Waterson	mason.waterson@watercharity.com	pass123pass	65
6	Jackson	Mall	jackson.mall@pci.com	pass123pass	28
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: totipu
--

SELECT pg_catalog.setval('public.user_id_seq', 6, true);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

