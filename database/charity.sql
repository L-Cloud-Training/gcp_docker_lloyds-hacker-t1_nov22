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
-- Name: charity; Type: TABLE; Schema: public; Owner: totipu
--

CREATE TABLE public.charity (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "createdByUser" character varying NOT NULL,
    funds double precision NOT NULL
);


-- ALTER TABLE public.charity OWNER TO totipu;

--
-- Name: charity_id_seq; Type: SEQUENCE; Schema: public; Owner: totipu
--

CREATE SEQUENCE public.charity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.charity_id_seq OWNER TO totipu;

--
-- Name: charity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: totipu
--

ALTER SEQUENCE public.charity_id_seq OWNED BY public.charity.id;


--
-- Name: charity id; Type: DEFAULT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public.charity ALTER COLUMN id SET DEFAULT nextval('public.charity_id_seq'::regclass);


--
-- Data for Name: charity; Type: TABLE DATA; Schema: public; Owner: totipu
--

COPY public.charity (id, name, description, "createdByUser", funds) FROM stdin;
1	Heifer International	Heifer International works with communities to increase income, improve child nutrition, care for the Earth, and ultimately end world hunger and poverty. Working internationally, around the globe helping small, local communities.	mark.povich@heiferinternational.com	15678.9
2	Bright Pink	Bright Pink helps to save lives from breast and ovarian cancer by empowering women to know their risk and manage their health proactively.	anny.brightling@brightpink.com	15432.700000000001
3	Vs. Cancer	Vs. Cancer empowers any sports team, any athlete and any community to help kids with cancer. As a signature fundraising campaign of the Pediatric Brain Tumor Foundation, proceeds help fund child life programs in local hospitals and lifesaving pediatric brain tumor research.	john.russinovich@vscancer.com	25790.400000000001
4	Watts of Love	This means a charity has to fall into one of a number of categories defined as charitable, such as the prevention or relief of poverty. Its sole purpose must be charitable. It can’t, for example, also aim to make profit or do something that isn’t defined as charitable, or provide ‘private benefit’ to anyone. The benefit must clearly be for the general public, or a sufficient section of them.	cindy.fundmaister@wattsoflove.com	3213.6999999999998
6	Project Concern International	PCI’s mission is to empower people to enhance health, end hunger and overcome hardship.	jackson.mall@pci.com	45002.699999999997
5	charity:water	charity: water is a nonprofit organization bringing clean and safe drinking water to people in developing nations.	mason.waterson@watercharity.com	123405.8
\.


--
-- Name: charity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: totipu
--

SELECT pg_catalog.setval('public.charity_id_seq', 6, true);


--
-- Name: charity PK_fbdd8ba5b5a6504618b8b1ab295; Type: CONSTRAINT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public.charity
    ADD CONSTRAINT "PK_fbdd8ba5b5a6504618b8b1ab295" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

