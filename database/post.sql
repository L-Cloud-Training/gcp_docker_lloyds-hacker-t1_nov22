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
-- Name: post; Type: TABLE; Schema: public; Owner: totipu
--

CREATE TABLE public.post (
    id integer NOT NULL,
    "charityId" integer NOT NULL,
    "userId" integer NOT NULL,
    "mediaId" integer NOT NULL,
    description character varying NOT NULL,
    funds double precision NOT NULL,
    "charityName" character varying,
    "userName" character varying
);


-- ALTER TABLE public.post OWNER TO totipu;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: totipu
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.post_id_seq OWNER TO totipu;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: totipu
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: totipu
--

COPY public.post (id, "charityId", "userId", "mediaId", description, funds, "charityName", "userName") FROM stdin;
1	1	1	1	Improve child nutrition fundraiser. Help us raise funds for improving child nutrition in southern Africa. Many families living in poverty can't provide necessary macro-nutritionaly balanced meals for their children. In order to help small communities outside of big cities we are making this fundraiser. Heifer International works with communities to increase income, improve child nutrition, care for the Earth, and ultimately end world hunger and poverty.	30000	Improve Child Nutrition - Heifer International	Mark Povich
2	5	5	5	International fundraiser for improvement of water quality in Namibia. Help us raise funds for remote communities living in Namibia that have to walk for 3-11 hours one-way to get drinking water for their families. Many families are living in poverty and can't provide necessary amounts of drinkable water for their children. In order to help this small communities outside of big cities	50032	Improve water quality in Namibia - charity:water	Mason Waterson
4	6	6	6	Raise people out of the darkness of poverty with amazing global solar lighting. Bring people the power with this fundraiser. Watts of Love is a nonprofit and it’s mission statement never fails to inspire other. We server people how weren't lucky as we are. Help us light up someone's day	25000	Solar lightning in Papua New Guinea - Watts of Love	Cindy Fundmaister
3	3	3	6	Vs. Cancer empowers any sports team, any athlete and any community to help kids with cancer. This fundraising campaign is for the Pediatric Brain Tumor Foundation, proceeds help fund child life programs in local hospitals and lifesaving pediatric brain tumor research for children aged under 16.	17321.5	Pediatric Brain Tumor Foundation - Vs. Cancer	John Russinovich
\.


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: totipu
--

SELECT pg_catalog.setval('public.post_id_seq', 11, true);


--
-- Name: post PK_be5fda3aac270b134ff9c21cdee; Type: CONSTRAINT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

